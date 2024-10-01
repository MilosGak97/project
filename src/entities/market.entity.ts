import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { County } from "./county.entity";

@Entity('markets')
export class Market{
    @ApiProperty({required:true})
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    total_cost: string

    @ApiProperty({required: true})
    @OneToMany(()=> County, (county) => county.market)
    county: County[]
}