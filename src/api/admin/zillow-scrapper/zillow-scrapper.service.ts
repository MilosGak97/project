import { Injectable } from '@nestjs/common';
import {  firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ZillowScrapperSnapshotRepository } from './repository/zillow-scrapper-snapshot.repository';
import { MarketRepository } from 'src/api/repositories/market.repository'; 
import { CountyRepository } from 'src/api/repositories/county.repository'; 
import { CreateMarketDto } from './dto/create-market.dto';
import { ListMarketsDto } from './dto/list-markets.dto';
import { Market } from 'src/api/entities/market.entity';
import { UpdateMarketDto } from './dto/update-market.dto';
import { CreateCountyDto } from './dto/create-county.dto';
import { ListCountiesDto } from './dto/list-counties.dto';
import { County } from 'src/api/entities/county.entity';
import { UpdateCountyDto } from './dto/update-county.dto';
import { ListSnapshotsDto } from './dto/list-snapshots.dto';
import { ZillowScrapperSnapshot } from 'src/api/entities/zillow-scrapper-snapshot.entity';
import { ListMarketSnapshotsDto } from './dto/list-market-snapshots.dto';

@Injectable()
export class ZillowScrapperService {
  constructor(
    private readonly zillowScrapperSnapshotRepository: ZillowScrapperSnapshotRepository,
    private readonly httpService: HttpService,
    private readonly marketRepository: MarketRepository,
    private readonly countyRepository: CountyRepository
  ) { }


  async triggerScrape(data):Promise<any> {
    const url = 'https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lfqkr8wm13ixtbd8f5&include_errors=true&type=discover_new&discover_by=url';

    const headers = {
      Authorization: `Bearer ${process.env.BRIGHTDATA_API_TOKEN}`,
      'Content-Type': 'application/json',
    };
 
      try {
        const response = await firstValueFrom(this.httpService.post(url, data, { headers }));
        console.log(response.data)
        if(response.data.snapshot_id){
          console.log("response.data.snapshot_id: "+ response.data.snapshot_id)
        }
        return response.data.snapshot_id; // Return the data from the response
      } catch (error) {
        throw new Error(`Error sending POST request: ${error.message}`);
      }
    }
     
  async sendPostRequest() {

    const markets = await this.marketRepository.marketsDailyActive()
    
    if(markets.length > 0){

      for(const market of markets){

        const data =  market.counties.map(county => ({ url: county.zillow_url_new })).filter(item => item.url)

        if(data.length > 0){

          const snapshot_id = await this.triggerScrape(data)
  
          console.log("Snapshot ID:" + snapshot_id)
          console.log("Market ID:" + market.id)
          await this.zillowScrapperSnapshotRepository.logSnapshot(snapshot_id, market.id)
        }else{
          console.log("Didnt found any urls in this market, ID:" + market.id)
        }
      }
    }else{
      console.log("No active markets found")
    }
       
  }

  
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
async getMarket(marketId:string):Promise<Market>{
  return await this.marketRepository.getMarket(marketId)
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

async getCounty( marketId:string, countyId:string):Promise<County>{
  return await this.countyRepository.getCounty(marketId, countyId)
}

async updateCounty( marketId:string, countyId:string, updateCountyDto: UpdateCountyDto):Promise<{
  message:string
}>{
  return await this.countyRepository.updateCounty(marketId, countyId, updateCountyDto)
}


async listSnapshots(listSnapshotsDto: ListSnapshotsDto):Promise<{
  result: ZillowScrapperSnapshot[],
  totalRecords: number,
  totalPages: number,
  currentPage: number,
  limit: number,
  offset: number
}>{
  return this.zillowScrapperSnapshotRepository.listSnapshots(listSnapshotsDto)
}


async listMarketSnapshots(marketId: string,  listMarketSnapshotsDto: ListMarketSnapshotsDto):Promise<{
        
  result: ZillowScrapperSnapshot[],
  totalRecords: number,
  totalPage: number,
  currentPage: number,
  limit: number,
  offset: number
}>{
  return await this.zillowScrapperSnapshotRepository.listMarketSnapshots(marketId, listMarketSnapshotsDto)
}
}
