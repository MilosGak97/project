import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty,  IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { County } from "./county.entity";

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

    @ApiProperty({required:true})
    @IsBoolean()
    @IsNotEmpty()
    @Column({name: 'daily_scrapping'})
    dailyScrapping: boolean

    }