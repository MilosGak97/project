import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Market } from "src/api/entities/market.entity";
import { States } from "src/api/enums/states.enum";

export class CreateCountyDto{
 

@ApiProperty({required:true})
@IsNotEmpty()
@IsString()
name:string

@ApiProperty({required:true})
@IsNotEmpty()
@IsEnum(States) 
state: States

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

