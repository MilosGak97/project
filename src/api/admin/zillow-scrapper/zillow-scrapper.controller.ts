import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { ZillowScrapperService } from './zillow-scrapper.service'; 
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Market } from 'src/api/entities/market.entity'; 
import { CreateMarketDto } from './dto/create-market.dto';
import { ListMarketsDto } from './dto/list-markets.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { CreateCountyDto } from './dto/create-county.dto';
import { ListCountiesDto } from './dto/list-counties.dto';
import { County } from 'src/api/entities/county.entity';
import { UpdateCountyDto } from './dto/update-county.dto';
import { ListSnapshotsDto } from './dto/list-snapshots.dto';
import { ListMarketSnapshotsDto } from './dto/list-market-snapshots.dto';
import { ZillowScrapperSnapshot } from 'src/api/entities/zillow-scrapper-snapshot.entity';

@ApiTags('Zillow Scrapper')
@Controller('admin/scrapper')
export class ZillowScrapperController {
    constructor(
        private readonly scrapperService: ZillowScrapperService, 
    ){}
/*
    @Post('trigger-scrapper')
    @ApiOperation({summary: "Trigger scrapper and get snapshot id"})
    async executeScrapperTask():Promise<any>{
        return this.scrapperService.sendPostRequest()
    }
 */
// new endpoint
@Post('markets')
@ApiOperation({summary: "Create market"})
async createMarket(@Body() CreateMarketDto: CreateMarketDto):Promise<{
    message:string
}>{
    return this.scrapperService.createMarket(CreateMarketDto)
}


// new endpoint
@Get('markets')
@ApiOperation({summary: "Get list of markets "})
async listMarkets(@Query() listMarketsDto: ListMarketsDto):Promise<{
    
    limit: number,
    offset: number,
    totalRecords: number,
    totalPages: number ,
    currentPage: number,
    result:Market[]
    
}>{
    return await this.scrapperService.listMarkets(listMarketsDto)
}

@Get('markets/:id')
@ApiOperation({summary: "Get single market per id"})
async getMarket(@Param('id') marketId:string):Promise<Market>{
    return await this.scrapperService.getMarket(marketId)
}

// new endpoint
@Delete('markets/:id')
@ApiOperation({summary: "Delete market by id"})
async deleteMarket(@Param('id') marketId: string):Promise<{
    message: string
}>{
    return await this.scrapperService.deleteMarket(marketId)
}

// new endpoint
@Patch('markets/:id')
@ApiOperation({summary: "Update market by id"})
async updateMarket(@Param('id') marketId: string, @Query() updateMarketDto: UpdateMarketDto){
    return await this.scrapperService.updateMarket(marketId, updateMarketDto)
}
// new endpoint
@Post('markets/:id/counties')
@ApiOperation({summary: "Create county and assign it to market"})
async createCounty(@Param('id') marketId:string, @Body() createCountyDto: CreateCountyDto):Promise<{
    message:string
}>{
    return await this.scrapperService.createCounty(marketId, createCountyDto)
}

// new endpoint
@Get('markets/:id/counties')
@ApiOperation({summary: "List all counties withing provided market"})
async listCounties(@Param('id') marketId:string, @Query() listCountiesDto:ListCountiesDto):Promise<{
    counties: County[]
}>{
    return await this.scrapperService.listCounties(marketId, listCountiesDto)
}
// new endpoint
@Delete('markets/:marketId/counties/:countyId')
@ApiOperation({summary: "Delete county "})
async deleteCounty(@Param('marketId') marketId:string, @Param('countyId') countyId: string){
    return await this.scrapperService.deleteCounty(marketId, countyId)
}

@Get('markets/:id/counties/:countyId')
@ApiOperation({summary: "Show county per id"})
async getCounty(@Param('id') marketId:string, @Param('countyId') countyId: string):Promise<County>{
    return await this.scrapperService.getCounty(marketId, countyId)
}

@Patch('markets/:id/counties/:countyId')
@ApiOperation({summary: "Update county per id"})
async updateCounty(@Param('id') marketId: string, @Param('countyId') countyId: string, @Query() updateCountyDto: UpdateCountyDto):Promise<{
    message:string
  }>{
    return await this.scrapperService.updateCounty(marketId, countyId, updateCountyDto)
}


@Get('snapshots')
@ApiOperation({summary: "List Snapshots logs"})
async listSnapshots(@Query() listSnapshotsDto: ListSnapshotsDto){
    return await this.scrapperService.listSnapshots(listSnapshotsDto)
}

@Get('markets/:id/snapshots')
@ApiOperation({summary: "List snapshots per market id"})
async listMarketSnapshot(@Param('id') marketId:string, @Query() listMarketSnapshotDto: ListMarketSnapshotsDto):Promise<{
        
    result: ZillowScrapperSnapshot[],
    totalRecords: number,
    totalPage: number,
    currentPage: number,
    limit: number,
    offset: number
}>{
    return await this.scrapperService.listMarketSnapshots(marketId, listMarketSnapshotDto)
}

@Post('markets/:id/snapshots')
@ApiOperation({summary: "Run manually scrapper for this market (24hrs)"})
async runScrapperMarket(@Param('id') marketId: string){
    return this.scrapperService.runScrapperMarket(marketId)
}



@Post('markets/:id/snapshots/:snapshotId')
@ApiOperation({summary: "Re-run snapshot import function manually"})
async fetchSnapshot(@Param('id') marketId: string, @Param('snapshotId') snapshotId: string){
    return await this.scrapperService.fetchSnapshot(marketId, snapshotId)
}

@Post('notification')
@ApiOperation({ summary: "Receive notification from post"})

async handleNotification(@Req() req: Request):Promise<{
    message:string
}> {
    const payload = req.body;
    return this.scrapperService.handleNotification(payload)
  }






}
