import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MarketManagementService } from './market-management.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMarketDto } from './dto/create-market.dto';
import { ListMarketsDto } from './dto/list-markets.dto';
import { Market } from 'src/api/entities/market.entity';
import { UpdateMarketDto } from './dto/update-market.dto';
import { create } from 'domain';
import { CreateCountyDto } from './dto/create-county.dto';
import { ListCountiesDto } from './dto/list-counties.dto';
import { County } from 'src/api/entities/county.entity';

@ApiTags('Market Management')
@Controller('admin/market-management')
export class MarketManagementController {
    constructor(
        private readonly marketManagementService: MarketManagementService,
        
    ){}

// new endpoint
    @Post('markets')
    @ApiOperation({summary: "Create market"})
    async createMarket(@Body() CreateMarketDto: CreateMarketDto):Promise<{
        message:string
    }>{
        return this.marketManagementService.createMarket(CreateMarketDto)
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
        return this.marketManagementService.listMarkets(listMarketsDto)
    }


// new endpoint
    @Delete('markets/:id')
    @ApiOperation({summary: "Delete market by id"})
    async deleteMarket(@Param('id') marketId: string):Promise<{
        message: string
    }>{
        return await this.marketManagementService.deleteMarket(marketId)
    }

// new endpoint
    @Patch('markets/:id')
    @ApiOperation({summary: "Update market by id"})
    async updateMarket(@Param('id') marketId: string, @Query() updateMarketDto: UpdateMarketDto){
        return await this.marketManagementService.updateMarket(marketId, updateMarketDto)
    }
// new endpoint
    @Post('markets/:id/counties')
    @ApiOperation({summary: "Create county and assign it to market"})
    async createCounty(@Param('id') marketId:string, @Body() createCountyDto: CreateCountyDto):Promise<{
        message:string
    }>{
        return await this.marketManagementService.createCounty(marketId, createCountyDto)
    }

// new endpoint
    @Get('markets/:id/counties')
    @ApiOperation({summary: "List all counties withing provided market"})
    async listCounties(@Param('id') marketId:string, @Query() listCountiesDto:ListCountiesDto):Promise<{
        counties: County[]
    }>{
        return await this.marketManagementService.listCounties(marketId, listCountiesDto)
    }
// new endpoint
// new endpoint
// new endpoint
// new endpoint
}
