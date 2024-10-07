import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { CountyStatus } from "src/api/enums/county-status.enum";

export class ListCountiesDto{
    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(CountyStatus)
    searchQuery: string


}