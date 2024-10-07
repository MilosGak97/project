import { ApiProperty } from "@nestjs/swagger";
import {  IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { States } from "src/api/enums/states.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Market } from "./market.entity";
import { ZillowScrapperSnapshot } from "src/api/entities/zillow-scrapper-snapshot.entity";
import { CountyStatus } from "../enums/county-status.enum";

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

    @ApiProperty({required: false}) // set this to true later
    //@IsNotEmpty()
    @IsEnum(CountyStatus)
    @Column()
    status: CountyStatus
    

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsEnum(States)
    @Column({nullable:false})
    state: States

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @Column({nullable:true})
    zillow_url_new?: string

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @Column({nullable:true})
    zillow_url_sold?: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    @Column({type: 'json', nullable:true})
    zipcodes?: string[];

    @ApiProperty({required:false})
    @IsOptional() 
    @ManyToOne(() => Market, (market) => market.counties)
    market: Market // This should automatically map to the correct foreign key
    

}