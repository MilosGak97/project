import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PropertyListingRepository } from '../zillow-scrapper/repository/property-listing.repository'; 
import { FilteredStatus } from 'src/api/enums/filtered-status.enum';
import { FilteringRepository } from './repositories/filtering.repository'; 
import { Admin } from 'src/api/entities/admin.entity';
import { Filtering } from 'src/api/schemas/filtering-logs.schema';
import { MarketRepository } from 'src/api/repositories/market.repository';
import { ListMarketsDto } from '../zillow-scrapper/dto/list-markets.dto';
import { Market } from 'src/api/entities/market.entity';

@Injectable()
export class FilteringFeatureService {
    constructor(
        private readonly marketRepository: MarketRepository,
        private readonly propertyListingRepository: PropertyListingRepository,
        private readonly filteringRepository: FilteringRepository,

    ){}

    async listMarkets():Promise<{
      response: any[]}>{
      const listMarketsDto = new ListMarketsDto()
      listMarketsDto.limit = 9999
      listMarketsDto.offset = 0
      
      const markets = await this.marketRepository.listMarkets(listMarketsDto)
      let response = []
      if(!markets){
        throw new NotFoundException("Did not find any markets")
      }
      for(const market of markets.result){
        const unfilteredCount = await this.propertyListingRepository.unfilteredMarket(market)

        response.push({
          market: market,
          unfilteredCount: unfilteredCount
        })
      }

      return {response}

    }

    async createFilteringLog(propertyId:string, admin:Admin, action:FilteredStatus){

      return this.filteringRepository.createFilteringLog(propertyId,admin,action)
    }


    async listAll():Promise<Filtering[]>{
      return this.listAll()
    }
}
