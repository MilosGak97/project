import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilteringFeatureService } from './filtering-feature.service';
import { GetAdmin } from '../auth/get-admin.decorator';
import { Admin } from 'src/api/entities/admin.entity';
import { FilteredStatus } from 'src/api/enums/filtered-status.enum';
import { Filtering } from 'src/api/schemas/filtering-logs.schema';
import { ListMarketsDto } from '../zillow-scrapper/dto/list-markets.dto';

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

    @ApiOperation({summary: "Filter properties by market"})
    @Get(':marketId')
    async filterMarket(){
        return
    }

    @ApiOperation({summary: "Log and update filtering action to property"})
    @Post(':propertyId')
    async createFiltering(@Param('propertyId') propertyId: string, @GetAdmin() admin: Admin, @Body() action: FilteredStatus){
        return this.filteringFeatureService.createFilteringLog(propertyId, admin, action)
    }

    @ApiOperation({summary: "Show logs of filtering actions taken by admins"})
    @Get('logs')
    async listFiltering():Promise<Filtering[]>{
        return this.filteringFeatureService.listAll()
    }
 




}
