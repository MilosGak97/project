import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { SingleCompanyDto } from './companies-type.dto';


@ApiExtraModels(SingleCompanyDto)
export class GetCompaniesResponseDto{
  @ApiProperty({type:  [SingleCompanyDto]})
  result: SingleCompanyDto[];

  @ApiProperty()
  totalRecords: number;

  @ApiProperty()
  totalPages: number

  @ApiProperty()
  currentPage: number

  @ApiProperty()
  limit: number

  @ApiProperty()
  offset: number
}