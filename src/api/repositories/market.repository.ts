import { DataSource, Repository } from "typeorm";
import { Market } from "../entities/market.entity";
import { Injectable, NotFoundException } from "@nestjs/common"; 
import { CreateMarketDto } from "../admin/market-management/dto/create-market.dto";
import { ListMarketsDto } from "../admin/market-management/dto/list-markets.dto";
import { MarketStatus } from "../enums/market-status";
import { UpdateMarketDto } from "../admin/market-management/dto/update-market.dto";
import { stat } from "fs";

@Injectable()
export class MarketRepository extends Repository<Market>{
    constructor(
        private readonly dataSource: DataSource,
    ){
        super(Market, dataSource.createEntityManager())
    }

// new method
    async createMarket(createMarketDto: CreateMarketDto ):Promise<{
        message:string
    }>{
        const {name, daily_scrapping } = createMarketDto
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
    async listMarkets(listMarketsDto: ListMarketsDto):Promise<{
        
        limit: number,
        offset: number,
        totalRecords: number,
        totalPages: number ,
        currentPage: number,
        result:Market[]
        
    }>{
    const { offset, limit, searchQuery, daily_scrapping, status} = listMarketsDto;
 
    const query = this.createQueryBuilder('market');
 
if (searchQuery && searchQuery.trim() !== '') { 
    console.log(`Searching for: ${searchQuery}`);
    query.andWhere('(market.name LIKE :searchQuery)', { searchQuery: `%${searchQuery}%` });
}
if(status){
    query.andWhere('(market.status = :status)', {status})
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


// new method
    async deleteMarket(marketId: string):Promise<{
        message: string
    }>{
        const market = await this.findOne({where: { id: marketId}})
        if(!market){
            throw new NotFoundException("There is no market with that ID.")
        }

        market.status = MarketStatus.DELETED
        await this.save(market)
        return {
            message: "Market is succesfully deleted."
        }
    }

// new method
    async updateMarket(marketId: string, updateMarketDto: UpdateMarketDto):Promise<{
        message:string
    }>{
        const market = await this.findOne({where: {id: marketId}})
        if(!market){
            throw new NotFoundException("Market with this ID does not exist.")
        }
        
        const {name, daily_scrapping, status} = updateMarketDto
        if(name){
            market.name = name
        }

        if(daily_scrapping){
            market.daily_scrapping = daily_scrapping
        }

        if(status){
            market.status = status
        }
        await this.save(market)

        return {
            message: "Market is succesfully updated."
        }
    }


// new method

// new method

// new method
    async marketsDailyActive():Promise<Market[]>{
        const market = await this.find({where: {daily_scrapping: true}, relations: ['counties']})

        if(!market){
            throw new NotFoundException('We couldnt find any market that has daily scrapping active')
        }
        return market
    }

}