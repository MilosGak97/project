import { DataSource, Repository } from "typeorm";
import { Market } from "src/api/entities/property-market.entity";
import { Injectable, NotFoundException } from "@nestjs/common"; 
import { ListMarketsDto } from "src/api/admin/data/properties/on-market/dto/list-markets.dto";
import { MarketStatus } from "src/api/enums/market-status";

@Injectable()
export class PropertyMarketRepository extends Repository<Market> {
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

}