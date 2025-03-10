import { ApiProperty } from '@nestjs/swagger';
import { CompanyStatus } from '../../../enums/company-status.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class SingleCompanyResponseDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  address1?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  address2?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  state?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  zipCode?: string;

  @ApiProperty()
  @IsNotEmpty()
  website: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phoneCountryCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phoneNumberPrefix?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  logoUrl?: string;

  @ApiProperty({ required: true, enum: CompanyStatus })
  @IsEnum(CompanyStatus)
  status: CompanyStatus;
}
