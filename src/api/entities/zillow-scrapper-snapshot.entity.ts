import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ScrapperSnapshotStatus } from "../enums/scrapper-snapshot-status.enum";  
import { County } from "src/api/entities/county.entity";
import { Market } from "./market.entity";
import { Type } from "class-transformer";
import { PropertyListing } from "./property-listing.entity";

@Entity('zillow-scrapper-snapshots')
export class ZillowScrapperSnapshot {
    @ApiProperty({required:true})
    @PrimaryGeneratedColumn('increment')
    id: number

    @ApiProperty({required:true})
    @IsNotEmpty()
    @Column()
    brightdata_id: string

    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(ScrapperSnapshotStatus)
    @Column()
    status: ScrapperSnapshotStatus

    @ApiProperty({required:false})
    @IsOptional()
    @ManyToOne(() => Market, (market) => market.snapshots)
    market: Market

    @ApiProperty({required:false})
    @IsOptional()
    @OneToMany(() => PropertyListing, (property) => property.snapshot)
    duplicatesProperties: PropertyListing[]

    @ApiProperty({required:false})
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Column({nullable:true})
    duplicatesCount: number


    @ApiProperty({required:false})
    @OneToMany(() => PropertyListing, (property) => property.snapshot)
    properties: PropertyListing[] 

    @ApiProperty({required:false})
    @CreateDateColumn()
    created_at: Date

    @ApiProperty({required:false})
    @IsOptional()
    @UpdateDateColumn()
    updated_at: Date
}