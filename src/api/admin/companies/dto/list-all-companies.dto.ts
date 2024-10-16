import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ListAllCompaniesDto{

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    searchQuery:string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @Type(() => Number) 
    limit:number

    @ApiProperty({required:true})
    @IsNotEmpty()
    @Type(() => Number) 
    offset:number


}