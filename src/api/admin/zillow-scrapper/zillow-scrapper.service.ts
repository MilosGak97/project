import { Injectable, NotFoundException } from '@nestjs/common';
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
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosResponse } from 'axios'; 
import * as zlib from 'zlib'
import { Readable } from 'typeorm/platform/PlatformTools';

@Injectable()
export class ZillowScrapperService {
  constructor(
    private readonly zillowScrapperSnapshotRepository: ZillowScrapperSnapshotRepository,
    private readonly httpService: HttpService,
    private readonly marketRepository: MarketRepository,
    private readonly countyRepository: CountyRepository
  ) { }
// new method - reusable trigger scrape
async triggerScrape(data): Promise<any> {
  const url = 'https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lfqkr8wm13ixtbd8f5&notify=https://uniqueproject-229b37d9b8ca.herokuapp.com/api/admin/scrapper/notification&type=discover_new&discover_by=url';
  
  const headers = {
    Authorization: `Bearer 07c11f1f-c052-45a9-b0fd-e385e5420129`, // Fetch token from environment
    'Content-Type': 'application/json',
  };
 

  try {
    // Make POST request using the httpService (make sure to inject httpService in your class)
    const response = await firstValueFrom(this.httpService.post(url, data, { headers }));

    console.log(response.data);

    // Check if snapshot_id is present in the response and return it
    if (response.data.snapshot_id) {
      console.log("Snapshot ID: " + response.data.snapshot_id);
      return response.data.snapshot_id;
    } else {
      // Handle case where snapshot_id is not returned
      throw new Error('Snapshot ID not found in the response.');
    }
  } catch (error) {
    // Handle errors properly, and return or log for debugging
    console.error('Error sending POST request:', error.response?.data || error.message);
    throw new Error(`Error sending POST request: ${error.message}`);
  }
}

// new method - cron request   
  async sendCronRequest() {

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
async fetchSnapshot(marketId: string, snapshotId: string): Promise<any> {
  const snapshot = await this.zillowScrapperSnapshotRepository.findOne({
    where: { brightdata_id: snapshotId, market: { id: marketId } },
  });

  if (!snapshot) {
    throw new NotFoundException("Snapshot with this ID and Market ID does not exist.");
  }

  const url = `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?compress=true&format=json`;
  const headers = {
    Authorization: `Bearer 07c11f1f-c052-45a9-b0fd-e385e5420129`,
  };

  
    const response = await firstValueFrom(
      this.httpService.request({
        url,
        method: 'GET',
        headers,
        responseType: 'stream',
        timeout: 10000,
      })
    );

    const decompressedData = await this.decompressData(response.data);

    const jsonData = JSON.parse(decompressedData.toString());

    // Check if jsonData is an array
    if (Array.isArray(jsonData)) {
        jsonData.forEach((item, index) => {
          
             
          const zpid = item.zpid; 
          const state = item.state;
          const city = item.address.city;
          
          // HERE GOES THE LOGIC TO IMPORT IT INTO MONGODB
          
          console.log('City: ' + city)
          console.log('State: ' + state)
          console.log(`ZPID: ${zpid}`); 
        });
    } else {
        console.error("jsonData is not an array");
    }
    

    return {
      message: "Sucessfully done job"
    }; 
}

// new method
private async decompressData(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: Buffer[] = [];
  const gunzip = zlib.createGunzip();
  return new Promise((resolve, reject) => {
    stream.pipe(gunzip)
      .on('data', (chunk) => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks).toString()))
      .on('error', reject);
  });
}

// new method
async runScrapperMarket(marketId: string){
  const market = await this.marketRepository.findOne({where: {id:marketId}, relations: ['counties']})
  if(!market){
    throw new NotFoundException("Market with provided ID does not exist.")
  }
  const counties = market.counties
  console.log(counties)
  if(counties.length === 0){
    throw new NotFoundException("No counties found for this market")
  }

  const data = counties.map( county => ({url: county.zillow_url_new })).filter(item => item.url)
  const snapshotId =await this.triggerScrape(data)

  return await this.zillowScrapperSnapshotRepository.logSnapshot(snapshotId, marketId)

}

// CRON METHOD
@Cron(CronExpression.EVERY_DAY_AT_6AM) // change this to 6AM after testing
    async cronHandler(){
      console.log('Triggering daily sendPostRequest...');
      await this.sendCronRequest()
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

async handleNotification(payload):Promise<{
  message: string
}> {
  if(!payload.snapshot_id){
    throw new NotFoundException("Snapshot ID is not found.")
  }
  const snapshot = await this.zillowScrapperSnapshotRepository.findOne({where: {brightdata_id: payload.snapshot_id}})
  snapshot.status = payload.status

  await this.zillowScrapperSnapshotRepository.save(snapshot)
  console.log("Snapshot status successfully updated")

  return {
    message: "Snapshot status successfully updated"
  }
}

async discoveryWebhook(payload) {
  console.log('Received payload:', payload);  // Log the payload for debugging
  let decompressedData;

  if (typeof payload === 'string') {
      decompressedData = payload;
  } else if (Buffer.isBuffer(payload)) {
      const readableStream = Readable.from(payload);
      decompressedData = await this.decompressData(readableStream);
  } else if (typeof payload === 'object' && payload !== null) {
      // Handle case where payload is an object or array
      decompressedData = JSON.stringify(payload); // or process it accordingly
  } else {
      throw new Error('Invalid payload format');
  }

  const jsonData = JSON.parse(decompressedData.toString());

  // Check if jsonData is an array
  if (Array.isArray(jsonData)) {
      jsonData.forEach((item) => {
          const zpid = item.zpid; 
          const state = item.state;
          const city = item.address.city;
          
          console.log('City: ' + city);
          console.log('State: ' + state);
          console.log(`ZPID: ${zpid}`); 
      });
  } else {
      throw new Error('Parsed data is not an array');
  }
}

}
