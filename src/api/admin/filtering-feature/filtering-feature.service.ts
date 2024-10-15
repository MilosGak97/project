import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PropertyListingRepository } from '../../repositories/postgres/property-listing.repository'; 
import { FilteredStatus } from 'src/api/enums/filtered-status.enum';
import { FilteringRepository } from '../../repositories/mongodb/filtering.repository'; 
import { Admin } from 'src/api/entities/admin.entity';
import { Filtering } from 'src/api/schemas/filtering-logs.schema';
import { MarketRepository } from 'src/api/repositories/market.repository';
import { ListMarketsDto } from '../zillow-scrapper/dto/list-markets.dto'; 
import { FilterMarketDto } from './dto/filter-market.dto';
import { PropertyListing } from 'src/api/entities/property-listing.entity';
import { ListLogsDto } from './dto/list-logs.dto';

@Injectable()
export class FilteringFeatureService {
    constructor(
        private readonly marketRepository: MarketRepository,
        private readonly propertyListingRepository: PropertyListingRepository,
        private readonly filteringRepository: FilteringRepository,

    ){}

    //new method
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

    //new method
    async filterMarket(marketId:string, filterMarketDto: FilterMarketDto):Promise<{
      properties: PropertyListing[],
      propertiesCount: number,
      limit: number,
      offset: number,
      totalPages: number,
      currentPage: number
  }>{
      return await this.propertyListingRepository.filterMarket(marketId,filterMarketDto)
    }


    //new method
    async createFilteringLog(propertyId:string, admin:Admin, action:FilteredStatus){
      return this.filteringRepository.createFilteringLog(propertyId,admin,action)
    }


    //new method
    async listLogs(listLogsDto: ListLogsDto):Promise<Filtering[]>{
      return this.filteringRepository.listLogs(listLogsDto)
    }
}
