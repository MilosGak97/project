import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { CountyStatus } from "src/api/enums/county-status.enum";
import { States } from "src/api/enums/states.enum";

export class UpdateCountyDto{
@ApiProperty({required:false})
@IsOptional()
@IsString()
name?:string

@ApiProperty({required:false})
@IsOptional()
@IsEnum(States) 
state?: States

@ApiProperty({required:false})
@IsOptional()
@IsEnum(CountyStatus)
status?: CountyStatus

@ApiProperty({required:false})
@IsString()
@IsOptional()
zillow_url_new?: string

@ApiProperty({required:false})
@IsString()
@IsOptional() 
zillow_url_sold?: string

@ApiProperty({required: false})
@IsString()
@IsOptional() 
zipcodes?: string[];
 

}