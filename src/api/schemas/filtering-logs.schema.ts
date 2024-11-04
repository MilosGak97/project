import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { FilteredStatus } from "../enums/filtered-status.enum";
import { ApiProperty } from "@nestjs/swagger";
export type FilteringDocument = Filtering & Document;

@Schema({timestamps:true})
export class Filtering{
    @ApiProperty({required:true})
    @Prop({required: true})
    adminId: string

    @ApiProperty({required:true})
    @Prop({required:true})
    propertyId: string

    @ApiProperty({required:true})
    @Prop({required:true})
    action: FilteredStatus
}

export const FilteringSchema = SchemaFactory.createForClass(Filtering)