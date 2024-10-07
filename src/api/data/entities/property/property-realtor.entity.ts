import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('property-realtors')
export class PropertyRealtor{
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string
}