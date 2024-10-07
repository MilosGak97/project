import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ZillowScrapperSnapshotRepository } from './repository/zillow-scrapper-snapshot.repository';
import { MarketRepository } from 'src/api/repositories/market.repository';
import { Market } from 'src/api/entities/market.entity';
import { CountyRepository } from 'src/api/repositories/county.repository';
import { In } from 'typeorm';

@Injectable()
export class ZillowScrapperService {
  constructor(
    private readonly zillowScrapperSnapshotRepository: ZillowScrapperSnapshotRepository,
    private readonly httpService: HttpService,
    private readonly marketRepository: MarketRepository,
    private readonly countyRepository: CountyRepository
  ) { }

  async createMarket() {
    const market = new Market
    market.name = "New Jersey3"
    market.daily_scrapping = true

/*
    const counties_ids = [
      '8710ed35-f7d1-4af3-bc77-fce0f09c5973',
      'd35b02a9-c9fa-40e6-9457-e94a9c804501',
      'f1aabbae-19af-4ca6-a043-b90156466ee4'
    ]

    const counties = await this.countyRepository.findBy({ id: In(counties_ids) })

    market.counties = counties
*/
    await this.marketRepository.save(market)
    return market
  }
  async getMarket() {
    const markets = await this.marketRepository.find({
      relations: ['counties'], // This will load the 'counties' relation
    });
    return markets;
  }

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
 
      for(const market of markets){

        const data =  market.counties.map(county => ({ url: county.zillow_url_new })).filter(item => item.url)
        const snapshot_id = await this.triggerScrape(data)
  
        console.log("Snapshot ID:" + snapshot_id)
        console.log("Market ID:" + market.id)
        return await this.zillowScrapperSnapshotRepository.logSnapshot(snapshot_id, market.id)
      }
       
  }
}
