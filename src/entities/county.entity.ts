import { APP_FILTER } from "@nestjs/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { States } from "src/enums/states.enum";
import { json } from "stream/consumers";
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

    @ApiProperty({required:true})
    @IsBoolean()
    @IsNotEmpty()
    @Column({nullable:false})
    belong_to_market: boolean

    @ApiProperty({required:false})
    @IsJSON()
    @IsOptional()  
    @Column({ type: 'json', nullable: true })
    market_size: JSON

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @Column()
    zillow_url: string

    @ApiProperty({required:false})
    @IsOptional()
    @ManyToOne(()=> Market, (market) => market.county)
    market: Market
}