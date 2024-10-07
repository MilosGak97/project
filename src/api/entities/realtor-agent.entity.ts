import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";

export class RealtorAgent{
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string
}