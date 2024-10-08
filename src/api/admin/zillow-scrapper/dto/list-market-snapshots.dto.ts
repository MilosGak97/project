import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator"
import { ScrapperSnapshotStatus } from "src/api/enums/scrapper-snapshot-status.enum"

export class ListMarketSnapshotsDto{
    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(ScrapperSnapshotStatus)
    status: ScrapperSnapshotStatus

    @ApiProperty({required:true})
    @IsNotEmpty()
    @Type(()=> Number)
    @IsNumber()
    limit: number

    @ApiProperty({required:true})
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    offset: number
}