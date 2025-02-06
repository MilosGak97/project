import { ApiProperty } from '@nestjs/swagger';
import { CompanyStatus } from '../../../enums/company-status.enum';
import { IsEnum } from 'class-validator';

export class SingleCompanyDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  address1?: string;

  @ApiProperty()
  address2?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  state?: string;

  @ApiProperty()
  zipcode?: string;

  @ApiProperty()
  website: string;

  @ApiProperty({ required: false })
  phoneNumber?: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  logoUrl?: string;

  @ApiProperty({ required: true, enum: CompanyStatus })
  @IsEnum(CompanyStatus)
  status: CompanyStatus;
}
