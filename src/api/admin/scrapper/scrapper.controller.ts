import { Controller, Post } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('admin/scrapper')
@Controller('scrapper')
export class ScrapperController {
    constructor(
        private readonly scrapperService: ScrapperService
    ){}

    @Post('snapshot')
    @ApiOperation({summary: "Get snapshot id from bright data"})
    async getSnapshotId():Promise<any>{
        return "string"
    }
}
