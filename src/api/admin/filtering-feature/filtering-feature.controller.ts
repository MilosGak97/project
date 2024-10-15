/*import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilteringFeatureService } from './filtering-feature.service';
import { GetAdmin } from '../auth/get-admin.decorator';
import { Admin } from 'src/api/entities/admin.entity';
import { FilteredStatus } from 'src/api/enums/filtered-status.enum';
import { Filtering } from 'src/api/schemas/filtering-logs.schema';
import { ListMarketsDto } from '../zillow-scrapper/dto/list-markets.dto';
import { FilterMarketDto } from './dto/filter-market.dto';
import { PropertyListing } from 'src/api/entities/property-listing.entity';
import { ListLogsDto } from './dto/list-logs.dto';

@ApiTags('Filtering Feature')
@Controller('filtering-feature')
export class FilteringFeatureController {
    constructor(
        private readonly filteringFeatureService: FilteringFeatureService
    ){}

    @ApiOperation({summary: "List all markets that need to be filtered"})
    @Get()
    async listMarkets(){
        return this.filteringFeatureService.listMarkets()
    }

    @ApiOperation({summary: "Show logs of filtering actions taken by admins"})
    @Get('logs')
    async listLogs(@Query() listLogsDto: ListLogsDto ):Promise<Filtering[]>{
        return this.filteringFeatureService.listLogs(listLogsDto)
    }


    @ApiOperation({summary: "Filter properties by market"})
    @Get(':marketId([0-9a-fA-F-]{36})')
    async filterMarket(@Param('marketId') marketId: string, @Query() filterMarketDto: FilterMarketDto):Promise<{
        properties: PropertyListing[],
        propertiesCount: number,
        limit: number,
        offset: number,
        totalPages: number,
        currentPage: number
    }>{
        return this.filteringFeatureService.filterMarket(marketId, filterMarketDto)
    }

    @ApiOperation({summary: "Log and update filtering action to property"})
    @Post(':propertyId')
    async createFiltering(@Param('propertyId') propertyId: string, @GetAdmin() admin: Admin, @Body() action: FilteredStatus):Promise<{
        message:string
    }>{
        return this.filteringFeatureService.createFilteringLog(propertyId, admin, action)
    }

 
    
}
*/