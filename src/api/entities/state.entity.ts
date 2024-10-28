import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { County } from "./county.entity";
import { BrightdataSnapshot } from "./brightdata-snapshot.entity";

@Entity('states')
export class State{
    @ApiProperty({required:true})
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsString()
    @Column()
    name: string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsString()
    @Column()
    abbreviation: string

    @ApiProperty({required:false})
    @OneToMany(() => County, (county) => county.state)
    counties?: County[]

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @Column()
    zillow_url_new: string

    @ApiProperty({required:true})
    @IsBoolean()
    @IsNotEmpty()
    @Column()
    daily_scrapping: boolean
    
    @OneToMany(() => BrightdataSnapshot, (snapshot) => snapshot.state)
    brightdataSnapshots: BrightdataSnapshot[];
    


    }