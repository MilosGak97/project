import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ScrapperSnapshotStatus } from "../enums/scrapper-snapshot-status.enum";
import { ScrapperTask } from "./scrapper-task.entity";
import { Task } from "@aws-sdk/client-ecs";

@Entity('scrapper-snapshots')
export class ScrapperSnapshot {
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
    @ManyToOne(() => ScrapperTask, (task) => task.snapshots) // Snapshot M to 1 Task
    task: Task

    @ApiProperty({required:false})
    @CreateDateColumn()
    created_at: Date

    @ApiProperty({required:false})
    @IsOptional()
    @UpdateDateColumn()
    updated_at: Date
}