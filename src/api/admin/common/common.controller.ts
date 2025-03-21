import { Controller, Get, Query } from '@nestjs/common';
import { CommonService } from './common.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatesResponseDto } from './dto/states-response.dto';
import { PhoneNumbersDto } from './dto/phone-numbers.dto';
import { PhoneNumbersResponseDto } from './dto/phone-numbers-response.dto';

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

  @ApiOperation({ summary: 'Get phone numbers and flags' })
  @ApiOkResponse({ type: PhoneNumbersResponseDto })
  @Get('phone-numbers')
  async getPhoneNumbers(
    @Query() phoneNumbersDto: PhoneNumbersDto,
  ): Promise<PhoneNumbersResponseDto> {
    return await this.commonService.getPhoneNumbers(phoneNumbersDto);
  }
}
