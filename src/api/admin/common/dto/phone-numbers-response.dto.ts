import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { PhoneNumbersTypeDto } from './phone-numbers-type.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

@ApiExtraModels(PhoneNumbersTypeDto)
export class PhoneNumbersResponseDto{
  @ApiProperty({ type: [PhoneNumbersTypeDto]})
  result: PhoneNumbersTypeDto[];


  @ApiProperty()
  @IsNumber()
  @Type((): NumberConstructor=> Number)
  totalRecords: number;

  @ApiProperty()
  @IsNumber()
  @Type((): NumberConstructor=> Number)
  currentPage: number;

  @ApiProperty()
  @IsNumber()
  @Type((): NumberConstructor=> Number)
  totalPages: number;

  @ApiProperty()
  @IsNumber()
  @Type((): NumberConstructor=> Number)
  limit: number;

  @ApiProperty()
  @IsNumber()
  @Type((): NumberConstructor=> Number)
  offset: number;
}