import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";

export class RealtorBroker{
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string
}