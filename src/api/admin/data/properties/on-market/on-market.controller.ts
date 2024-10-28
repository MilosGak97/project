import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAdmin } from 'src/api/admin/auth/get-admin.decorator';
import { FilterStatesDto } from 'src/api/admin/data/properties/on-market/dto/filter-states.dto';
import { ListLogsDto } from 'src/api/admin/data/properties/on-market/dto/list-logs.dto';
import { Admin } from 'src/api/entities/admin.entity';
import { PropertyListing } from 'src/api/entities/property-listing.entity';
import { FilteredStatus } from 'src/api/enums/filtered-status.enum';
import { Filtering } from 'src/api/schemas/filtering-logs.schema';
import { OnMarketService } from './on-market.service'; 
import { ListSnapshotsDto } from 'src/api/admin/data/properties/on-market/dto/list-snapshots.dto'; 
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/api/admin/auth/roles.guard';
import { Roles } from 'src/api/admin/auth/roles.decorator';
import { AdminRole } from 'src/api/enums/admin-role.enum';
import { StatesAbbreviation } from 'src/api/enums/states-abbreviation.enum';


@ApiTags('Data/Properties/ On-Market')
@UseGuards(AuthGuard(), RolesGuard)
@Controller('admin/data/properties/on-market')
export class OnMarketController {
    constructor(
        private readonly onMarketService: OnMarketService
    ) { }

    //new endpoint
    @Roles(AdminRole.HEAD, AdminRole.FILTERING)
    @ApiOperation({ summary: "List all states that need to be filtered" })
    @Get('filter/states')
    async filterStatesList() {
        return this.onMarketService.filterStatesList()
    }



    //new endpoint
    @Roles(AdminRole.HEAD, AdminRole.FILTERING)
    @ApiOperation({ summary: "Filter properties by states" })
    @Get('filter/states/:stateAbbreviation')
    async filterStates(@Param('stateAbbreviation') state: StatesAbbreviation, @Query() filterStateDto: FilterStatesDto): Promise<{
        properties: PropertyListing[],
        propertiesCount: number,
        limit: number,
        offset: number,
        totalPages: number,
        currentPage: number
    }> {
        return this.onMarketService.filterStates(state, filterStateDto)
    }

    //new endpoint
    @Roles(AdminRole.HEAD, AdminRole.FILTERING)
    @ApiOperation({ summary: "Show logs of filtering actions taken by admins" })
    @Get('filter/logs')
    async listLogs(@Query() listLogsDto: ListLogsDto): Promise<Filtering[]> {
        return this.onMarketService.listLogs(listLogsDto)
    }


    //new endpoint
    @Roles(AdminRole.HEAD, AdminRole.FILTERING)
    @ApiOperation({ summary: "Log and update filtering action to property" })
    @Patch('filter/:propertyId') // was post, test it
    async filteringAction(@Param('propertyId') propertyId: string, @GetAdmin() admin: Admin, @Body() action: FilteredStatus): Promise<{
        message: string
    }> {
        return this.onMarketService.filteringAction(propertyId, admin, action)
    }


    // new endpoint
    @Roles(AdminRole.HEAD, AdminRole.SCRAPPING)
    @Post('brightdata/notifications')
    @ApiOperation({ summary: "Webhook: Receive notification from brightdata" })

    async notificationBrightdata(@Req() req: Request): Promise<{
        message: string
    }> {
        const payload = req.body;
        console.log("PAYLOAD: ", JSON.stringify(payload, null, 2)); // Pretty-print with 2 spaces indentation
        return this.onMarketService.notificationBrightdata(payload)
    }

    /* 
    ubaci ovde opciju da se filtrira po market IDju
    */
    @Roles(AdminRole.HEAD, AdminRole.SCRAPPING)
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


    @Roles(AdminRole.HEAD, AdminRole.SCRAPPING)
    @Post('brightdata/snapshots/:marketId')
    @ApiOperation({ summary: "Run manually scrapper for this market (24hrs)" })
    async runScrapperMarket(@Param('marketId') marketId: string) {
       // return await this.onMarketService.runScrapperMarket(marketId)
    }



    @Roles(AdminRole.HEAD, AdminRole.SCRAPPING)
    @Post('brightdata/snapshots/:snapshotId') //
    @ApiOperation({ summary: "Re-run snapshot import function manually" })
    async fetchSnapshot(@Param('snapshotId') snapshotId: string): Promise<{
        message: string
    }> {
        return await this.onMarketService.fetchSnapshot(snapshotId)
    }




}



