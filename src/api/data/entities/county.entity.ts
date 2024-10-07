import { ApiProperty } from "@nestjs/swagger";
import {  IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { States } from "src/api/common/enums/states.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Market } from "./market.entity";

@Entity('counties')
export class County{
    @ApiProperty({required:true})
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsString()
    @Column({nullable:false})
    name:string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsEnum(States)
    @Column({nullable:false})
    state: States

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @Column()
    zillow_url_new?: string

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @Column()
    zillow_url_sold?: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    @Column({type: 'json'})
    zipcodes?: string[];

    @ApiProperty({required:false})
    @IsOptional()
    @ManyToOne(()=> Market, (market) => market.counties)
    market?: Market
}