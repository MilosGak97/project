import { DataSource, Repository } from "typeorm";
import { Market } from "../entities/market.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMarketDto } from "../admin/zillow-scrapper/dto/create-market.dto";
import { ListMarketsDto } from "../admin/zillow-scrapper/dto/list-markets.dto";
import { MarketStatus } from "../enums/market-status";
import { UpdateMarketDto } from "../admin/zillow-scrapper/dto/update-market.dto";

@Injectable()
export class MarketRepository extends Repository<Market> {
    constructor(
        private readonly dataSource: DataSource,
    ) {
        super(Market, dataSource.createEntityManager())
    }
    //active
    async listMarkets(listMarketsDto: ListMarketsDto): Promise<{

        limit: number,
        offset: number,
        totalRecords: number,
        totalPages: number,
        currentPage: number,
        result: Market[]

    }> {
        const { offset, limit, searchQuery, daily_scrapping, status } = listMarketsDto;

        const query = this.createQueryBuilder('market');

        if (searchQuery && searchQuery.trim() !== '') {
            console.log(`Searching for: ${searchQuery}`);
            query.andWhere('(market.name LIKE :searchQuery)', { searchQuery: `%${searchQuery}%` });
        }
        if (status) {
            query.andWhere('(market.status = :status)', { status })
        }

        if (daily_scrapping !== undefined) {
            query.andWhere('(market.daily_scrapping = :daily_scrapping)', { daily_scrapping });
        }

        query.take(limit);
        query.skip(offset);

        const [result, totalRecords] = await query.getManyAndCount();
        const totalPages = Math.ceil(totalRecords / limit);
        const currentPage = Math.floor(offset / limit) + 1;
        console.log('daily_scrapping:', daily_scrapping);

        return {
            limit,
            offset,
            totalRecords,
            totalPages,
            currentPage,
            result,
        };
    }

    //active
    async marketsDailyActive(): Promise<Market[]> {
        //const market = await this.find({where: {daily_scrapping: true, status: MarketStatus.ACTIVE}, relations: ['counties']})

        const market2 = await this.createQueryBuilder('market')
            .leftJoinAndSelect('market.counties', 'counties')
            .andWhere('(market.daily_scrapping = :daily_scrapping)', { daily_scrapping: true })
            .andWhere('(market.status = :marketStatus)', { marketStatus: MarketStatus.ACTIVE })
            .andWhere('(counties.id IS NOT NULL)')
            .getMany()

        if (market2.length === 0) {
            throw new NotFoundException('We couldnt find any market that has daily scrapping active')
        }
        return market2
    }

/*

    // new method
    async createMarket(createMarketDto: CreateMarketDto): Promise<{
        message: string
    }> {
        const { name, daily_scrapping } = createMarketDto
        const market = new Market()
        market.name = name
        market.daily_scrapping = daily_scrapping
        market.status = MarketStatus.ACTIVE
        await this.save(market)

        return {
            message: "Market is succesfully created."
        }
    }



    // new method
    async deleteMarket(marketId: string): Promise<{
        message: string
    }> {
        const market = await this.findOne({ where: { id: marketId } })
        if (!market) {
            throw new NotFoundException("There is no market with that ID.")
        }
        market.daily_scrapping = false
        market.status = MarketStatus.DELETED
        await this.save(market)
        return {
            message: "Market is succesfully deleted."
        }
    }

    // new method
    async updateMarket(marketId: string, updateMarketDto: UpdateMarketDto): Promise<{
        message: string
    }> {
        const market = await this.findOne({ where: { id: marketId } })
        if (!market) {
            throw new NotFoundException("Market with this ID does not exist.")
        }

        const { name, daily_scrapping, status } = updateMarketDto
        if (name) {
            market.name = name
        }

        if (daily_scrapping !== undefined) {
            market.daily_scrapping = daily_scrapping
        }

        if (status) {
            market.status = status
        }
        await this.save(market)

        return {
            message: "Market is succesfully updated."
        }
    }


    // new method
    async getMarket(marketId: string): Promise<Market> {
        const market = await this.findOne({ where: { id: marketId }, relations: ['snapshots'] })
        if (!market) {
            throw new NotFoundException("There is no market with that ID.")
        }
        return market
    }
    // new method

    // new method
*/

}