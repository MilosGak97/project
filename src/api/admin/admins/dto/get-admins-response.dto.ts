import { ApiProperty } from "@nestjs/swagger"
import { GetAdminsTypeDto } from './get-admins-type.dto';

export class GetAdminsResponseDto{
    @ApiProperty()
    result: GetAdminsTypeDto[]

    @ApiProperty()
    totalRecords: number

    @ApiProperty()
    currentPage: number

    @ApiProperty()
    totalPages: number

    @ApiProperty()
    limitNumber: number

    @ApiProperty()
    offsetNumber: number
}