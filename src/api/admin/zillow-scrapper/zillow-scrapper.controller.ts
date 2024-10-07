import { Controller, Get, Post } from '@nestjs/common';
import { ZillowScrapperService } from './zillow-scrapper.service'; 
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Market } from 'src/api/entities/market.entity';

@ApiTags('Zillow Scrapper')
@Controller('admin/scrapper')
export class ZillowScrapperController {
    constructor(
        private readonly scrapperService: ZillowScrapperService
    ){}

    @Post('triggerScrapper')
    @ApiOperation({summary: "Trigger scrapper and get snapshot id"})
    async executeScrapperTask():Promise<any>{
        return this.scrapperService.sendPostRequest()
    }
 
 
}
