import { Injectable } from '@nestjs/common';
import { CreateMarketDto } from './dto/create-market.dto'; 
import { MarketRepository } from 'src/api/repositories/market.repository'; 
import { ListMarketsDto } from './dto/list-markets.dto';
import { Market } from 'src/api/entities/market.entity';
import { UpdateMarketDto } from './dto/update-market.dto';
import { CreateCountyDto } from './dto/create-county.dto';
import { CountyRepository } from 'src/api/repositories/county.repository';
import { ListCountiesDto } from './dto/list-counties.dto';
import { County } from 'src/api/entities/county.entity';

@Injectable()
export class MarketManagementService {
    constructor(
        private readonly marketRepository: MarketRepository,
        private readonly countyRepository: CountyRepository
    ){}

// new method
    async createMarket(createMarketDto:CreateMarketDto):Promise<{
        message:string
    }>{
        return this.marketRepository.createMarket(createMarketDto)
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
        return this.marketRepository.listMarkets(listMarketsDto)
    }

// new method

    async deleteMarket(marketId:string):Promise<{
        message: string
    }>{
        return await this.marketRepository.deleteMarket(marketId)
    }

// new method
    async updateMarket(marketId:string, updateMarketDto: UpdateMarketDto):Promise<{
        message:string
    }>{
        return this.marketRepository.updateMarket(marketId,updateMarketDto)
    }
// new method
 
// new method
    async createCounty(marketId:string, createCountyDto: CreateCountyDto):Promise<{
        message:string
    }>{
        return this.countyRepository.createCounty(marketId,createCountyDto)
    }
// new method
    async listCounties(marketId:string, listCountiesDto: ListCountiesDto):Promise<{
        counties: County[]
    }>{
        return this.countyRepository.listCounties(marketId, listCountiesDto)
    }
// new method
    async deleteCounty(marketId:string, countyId:string):Promise<{
        message: string
    }>{
        return await this.countyRepository.deleteCounty(marketId, countyId)
    }

}
