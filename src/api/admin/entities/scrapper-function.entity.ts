import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ScrapperTask } from "./scrapper-task.entity";

@Entity('scrapper-logic')
export class ScrapperFunction{
    @ApiProperty({required:true})
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsString()
    @Column()
    name: string


    @ApiProperty({required:false})
    @IsOptional()
    @OneToMany(() => ScrapperTask, (task) => task.scrapper_function) // Function 1 to m Tasks
    tasks: ScrapperTask[]
    // ....
}