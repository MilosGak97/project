import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";  
import { County } from "./county.entity";
import { ZillowScrapperSnapshot } from "./zillow-scrapper-snapshot.entity";
import { MarketStatus } from "../enums/market-status";
//import { Subscription } from "../property-listings/entities/subscription.entity";

@Entity('markets')
export class Market{
    @ApiProperty({required:true})
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    @Column()
    name: string

    @ApiProperty({required:true}) // change this to true later
    @IsNotEmpty() // delete comments later
    @IsEnum(MarketStatus)
    @Column()
    status: MarketStatus

    @ApiProperty({required:true})
    @IsBoolean()
    @IsNotEmpty()
    @Column()
    daily_scrapping: boolean

    @ApiProperty({required: false}) 
    @IsOptional()
    @OneToMany(() => County, (county) => county.market)
    counties?: County[]

    
    @ApiProperty({required:false})
    @IsOptional()
    @OneToMany(() => ZillowScrapperSnapshot, (snapshot) => snapshot.market) // county 1 --- m snapshots
    snapshots?: ZillowScrapperSnapshot[]


}