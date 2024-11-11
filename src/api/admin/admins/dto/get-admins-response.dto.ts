import { ApiProperty } from "@nestjs/swagger"
import { Admin } from "src/api/entities/admin.entity"

export class GetAdminsResponseDto{
    @ApiProperty()
    result: Admin[]
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