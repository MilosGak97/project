import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { CompaniesTypeDto } from './companies-type.dto';


@ApiExtraModels(CompaniesTypeDto)
export class ListAllCompaniesResponseDto{
  @ApiProperty({type:  [CompaniesTypeDto]})
  result: CompaniesTypeDto[];

  @ApiProperty()
  totalRecords: number;

  @ApiProperty()
  totalPages: number

  @ApiProperty()
  currentPage: number

  @ApiProperty()
  numLimit: number

  @ApiProperty()
  numOffset: number
}