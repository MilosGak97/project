import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { StatesAbbreviation } from '../../../enums/states-abbreviation.enum';
import { Transform } from 'class-transformer';

export class UpdateCompanyDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => (value === '' ? null : value))
  phoneNumber?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address1?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false, enum: StatesAbbreviation })
  @IsOptional()
  @IsEnum(StatesAbbreviation)
  state?: StatesAbbreviation;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  zipCode?: string;
}
