import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ScrapperSnapshotStatus } from "src/api/enums/scrapper-snapshot-status.enum";
import { StatesAbbreviation } from "src/api/enums/states-abbreviation.enum";
import { IsNull } from "typeorm";

export class ListSnapshotsDto{
    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    searchQuery: string

    @ApiProperty({required:false})
    @IsOptional()
    @IsDate()
    created_at: Date

    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(ScrapperSnapshotStatus)
    status: ScrapperSnapshotStatus

    
    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(StatesAbbreviation)
    state: StatesAbbreviation

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