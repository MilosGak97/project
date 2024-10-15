import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ListLogsDto{
    @ApiProperty({required:false})
    @IsOptional()
    limit?: number

    @ApiProperty({required:false})
    @IsOptional()
    offset?:number
}