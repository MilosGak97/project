import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ScrapperSnapshotStatus } from "../enums/scrapper-snapshot-status.enum";  
import { County } from "src/api/entities/county.entity";
import { Market } from "./market.entity";

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
    @CreateDateColumn()
    created_at: Date

    @ApiProperty({required:false})
    @IsOptional()
    @UpdateDateColumn()
    updated_at: Date
}