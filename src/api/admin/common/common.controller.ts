import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatesResponseDto } from './dto/states-response.dto';

@ApiTags('Common')
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @ApiOperation({ summary: 'Get States Abbreviation' })
  @ApiOkResponse({ type: StatesResponseDto })
  @Get('states')
  async getStates(): Promise<StatesResponseDto> {
    return await this.commonService.getStates();
  }
}
