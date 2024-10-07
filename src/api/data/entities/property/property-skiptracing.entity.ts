import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('property-skiptracing')
export class PropertySkiptracing{
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string
}