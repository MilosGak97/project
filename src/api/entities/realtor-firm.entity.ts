import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";

export class RealtorFirm{
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string
}