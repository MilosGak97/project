import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('property-owners')
export class PropertyOwner{
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string
}