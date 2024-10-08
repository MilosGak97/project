import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { County } from "src/api/entities/county.entity";
import { OneToMany } from "typeorm";

export class CreateMarketDto{
    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsString()
    name: string

     
    @ApiProperty({required:true})
    @IsBoolean()
    @IsNotEmpty() 
    daily_scrapping: boolean

}