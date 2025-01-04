import { CompaniesUsersTypeDto } from './companies-users-type.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels(CompaniesUsersTypeDto)
export class GetCompaniesUsersResponseDto{
  @ApiProperty({type: [CompaniesUsersTypeDto]})
  result: CompaniesUsersTypeDto[]

  @ApiProperty()
  totalRecords: number

  @ApiProperty()
  totalPages: number

  @ApiProperty()
  currentPage: number

  @ApiProperty()
  numOffset: number

  @ApiProperty()
  numLimit: number
}