import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { SingleCompanyResponseDto } from './single-company-response';


@ApiExtraModels(SingleCompanyResponseDto)
export class GetCompaniesResponseDto{
  @ApiProperty({type:  [SingleCompanyResponseDto]})
  result: SingleCompanyResponseDto[];

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