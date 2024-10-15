import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAdmin } from 'src/api/admin/auth/get-admin.decorator';
import { FilterMarketDto } from 'src/api/admin/filtering-feature/dto/filter-market.dto';
import { ListLogsDto } from 'src/api/admin/filtering-feature/dto/list-logs.dto'; 
import { Admin } from 'src/api/entities/admin.entity';
import { PropertyListing } from 'src/api/entities/property-listing.entity';
import { FilteredStatus } from 'src/api/enums/filtered-status.enum';
import { Filtering } from 'src/api/schemas/filtering-logs.schema'; 
import { OnMarketService } from './on-market.service';
import { CreateMarketDto } from 'src/api/admin/zillow-scrapper/dto/create-market.dto';
import { ListMarketsDto } from 'src/api/admin/zillow-scrapper/dto/list-markets.dto';
import { Market } from 'src/api/entities/market.entity';
import { UpdateMarketDto } from 'src/api/admin/zillow-scrapper/dto/update-market.dto';
import { CreateCountyDto } from 'src/api/admin/zillow-scrapper/dto/create-county.dto';
import { ListCountiesDto } from 'src/api/admin/zillow-scrapper/dto/list-counties.dto';
import { County } from 'src/api/entities/county.entity';
import { ListSnapshotsDto } from 'src/api/admin/zillow-scrapper/dto/list-snapshots.dto';
import { ZillowScrapperSnapshot } from 'src/api/entities/zillow-scrapper-snapshot.entity';
import { ListMarketSnapshotsDto } from 'src/api/admin/zillow-scrapper/dto/list-market-snapshots.dto';
import { UpdateCountyDto } from 'src/api/admin/zillow-scrapper/dto/update-county.dto';


@ApiTags('Data/Properties - On Market')
@Controller('data/properties/on-market')
export class OnMarketController { 
        constructor(
            private readonly onMarketService: OnMarketService
        ){}
        @ApiOperation({summary: "List all markets that need to be filtered"})
        @Get('filter/markets')
        async listMarkets(){
            return this.onMarketService.listMarkets()
        }
    

    
        @ApiOperation({summary: "Filter properties by market"})
        @Get('filter/markets/:marketId([0-9a-fA-F-]{36})')
        async filterMarket(@Param('marketId') marketId: string, @Query() filterMarketDto: FilterMarketDto):Promise<{
            properties: PropertyListing[],
            propertiesCount: number,
            limit: number,
            offset: number,
            totalPages: number,
            currentPage: number
        }>{
            return this.onMarketService.filterMarket(marketId, filterMarketDto)
        }
    
        @ApiOperation({summary: "Show logs of filtering actions taken by admins"})
        @Get('filter/logs')
        async listLogs(@Query() listLogsDto: ListLogsDto ):Promise<Filtering[]>{
            return this.onMarketService.listLogs(listLogsDto)
        }
    

        @ApiOperation({summary: "Log and update filtering action to property"})
        @Patch('filter/:propertyId') // was post, test it
        async createFiltering(@Param('propertyId') propertyId: string, @GetAdmin() admin: Admin, @Body() action: FilteredStatus):Promise<{
            message:string
        }>{
            return this.onMarketService.createFilteringLog(propertyId, admin, action)
        }
    
 
    // new endpoint
    @Post('brightdata/notifications')
    @ApiOperation({ summary: "Webhook: Receive notification from brightdata" })

    async handleNotification(@Req() req: Request): Promise<{
        message: string
    }> {
        const payload = req.body;
        console.log("PAYLOAD: ", JSON.stringify(payload, null, 2)); // Pretty-print with 2 spaces indentation
        return this.onMarketService.handleNotification(payload)
    }
    
/* 
ubaci ovde opciju da se filtrira po market IDju
*/
    @Get('brightdata/snapshots')
    @ApiOperation({ summary: "List Snapshots logs" })
    async listSnapshots(@Query() listSnapshotsDto: ListSnapshotsDto) {
        return await this.onMarketService.listSnapshots(listSnapshotsDto)
    }
/*
    @Get('brightdata/:marketId/snapshots')
    @ApiOperation({ summary: "List snapshots per market id" })
    async listMarketSnapshot(@Param('marketId') marketId: string, @Query() listMarketSnapshotDto: ListMarketSnapshotsDto): Promise<{

        result: ZillowScrapperSnapshot[],
        totalRecords: number,
        totalPage: number,
        currentPage: number,
        limit: number,
        offset: number
    }> {
        return await this.onMarketService.listMarketSnapshots(marketId, listMarketSnapshotDto)
    }
*/


    @Post('brightdata/snapshots/:marketId')
    @ApiOperation({ summary: "Run manually scrapper for this market (24hrs)" })
    async runScrapperMarket(@Param('marketId') marketId: string):Promise<{
        message:string
    }> {
        return await this.onMarketService.runScrapperMarket(marketId)
    }



    @Post('brightdata/snapshots/:snapshotId') //
    @ApiOperation({ summary: "Re-run snapshot import function manually" })
    async fetchSnapshot(@Param('snapshotId') snapshotId: string):Promise<{
        message:string
    }> {
        return await this.onMarketService.fetchSnapshot(snapshotId)
    }



        
    }
    

 
