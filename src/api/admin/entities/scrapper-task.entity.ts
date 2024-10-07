import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"; 
import { ScrapperFunction } from "./scrapper-function.entity";
import { ScrapperSnapshot } from "./scrapper-snapshot.entity";

@Entity('scrapper-task')
export class ScrapperTask{
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    @Column()
    name: string

    @ApiProperty({required:false})
    @OneToMany(() => ScrapperSnapshot, (snapshot) => snapshot.task)
    snapshots: ScrapperSnapshot[]
    // task 1 --- m snapshot


    @ApiProperty({required:true})
    @ManyToOne(() => ScrapperFunction, (scrapper_function) => scrapper_function.tasks) // Task M --- 1 Function
    scrapper_function: ScrapperFunction


    // ....
}