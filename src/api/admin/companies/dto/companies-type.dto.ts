import { ApiProperty } from '@nestjs/swagger';
import { CompanyStatus } from '../../../enums/company-status.enum';

export class SingleCompanyDto{
  @ApiProperty({required:true})
  id: string

  @ApiProperty({required:true})
  name: string

  @ApiProperty()
  address1?: string

  @ApiProperty()
  address2?: string


  @ApiProperty()
  city?: string


  @ApiProperty()
  state?: string

  @ApiProperty()
  zipcode?: string

  @ApiProperty()
  website: string

  @ApiProperty({required: false })
  phone_number?: string

  @ApiProperty({required:false})
  email: string

  @ApiProperty({required:false})
  logo_url?: string

  @ApiProperty({required:true})
  status: CompanyStatus
}