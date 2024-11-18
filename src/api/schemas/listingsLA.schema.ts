import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { FilteredStatus } from "../enums/filtered-status.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
export type ListingsLADocument = ListingsLA & Document;

@Schema({timestamps:true, collection: 'djallal_listings'})
export class ListingsLA{ 
 

    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: true})
    zpid?: string // zpid

    
    
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    homeStatus?: string // homeStatus

    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    streetAddress?: string // address.streetAddress

    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    city?: string // address.city
    
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    zipcode?: string // address.zipcode
    
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    state?: string // address.state
    
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => Number) 
    @Prop({required: false})
    bedrooms?: number;
    
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => Number)
    @Prop({required: false})
    bathrooms?: number // bathrooms
    
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => Number)
    @Prop({required: false})
    price?: number // price


    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    longitude?: string // longitude

    
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    latitude?: string // latitude
 
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => Number)
    @Prop({required: false})
    livingArea?: number // livingArea



    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    livingAreaUnitsShort?: string // livingAreaUnitsShort
  
 
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    homeType?: string // homeType
 
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    parcelId?: string // parcelId
 
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    hdpTypeDimension?: string // hdpTypeDimension


    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => Number)
    @Prop({required: false})
    photoCount?: number // photoCount
    
    @ApiProperty({required:false})
    @IsOptional() 
    @Prop({required: false})
    photos?: any[] // photos
    
    @ApiProperty({required:false})
    @IsOptional()
    @Type(() => String)
    @Prop({required: false})
    county?: string // county

    @ApiProperty({required:false})
    @IsOptional()
    @Prop({ type: MongooseSchema.Types.Mixed, required: false })
    additionalInfo?: any


    
    @IsOptional()
    @IsString()
    @Prop({required: false})
    listing_provided_by_name?: string

    
    @IsOptional()
    @IsString()
    @Prop({required: false})
    listing_provided_by_email?: string

    
    @IsOptional()
    @IsString()
    @Prop({required: false})
    listing_provided_by_company?: string

    
    @IsOptional()
    @IsString()
    @Prop({required: false})
    listing_provided_by_phone_number?: string

    @IsOptional()
    @IsString()
    @Prop({required: false})
    isNonOwnerOccupied?:string
 


    @ApiProperty({required:false})
    @Prop({required: false})
    filtered_status: string

    @ApiProperty({required:false})
    @Prop({required: false})
    for_sale: string

    @ApiProperty({required:false})
    @Prop({required: false})
    for_sale_date: Date

    @ApiProperty({required:false})
    @Prop({ type: MongooseSchema.Types.Mixed, required: false })
    for_sale_reachout: any

    @ApiProperty({required:false})
    @Prop({required: false})
    coming_soon: string


    @ApiProperty({required:false})
    @Prop({required: false})
    coming_soon_date: string

    @ApiProperty({required:false})
    @Prop({ type: MongooseSchema.Types.Mixed, required: false })
    coming_soon_reachout: any

    @ApiProperty({required:false})
    @Prop({required: false})
    pending: string
    
    @ApiProperty({required:false})
    @Prop({required: false})
    pending_date: Date
    
    @ApiProperty({required:false})
    @Prop({ type: MongooseSchema.Types.Mixed, required: false })
    pending_reachout: any
    
    @ApiProperty({required:false})
    @Prop({required: false})
    verified: string
    
    @ApiProperty({required:false})
    @Prop({required: false})
    owners: any[]
    
    @ApiProperty({required:false})
    @Prop({ type: MongooseSchema.Types.Mixed, required: false })
    company_owned: any
    
    @ApiProperty({required:false})
    @Prop({required: false})
    current_status: string
    
    @ApiProperty({required:false})
    @Prop({required: false})
    current_status_date: string
    
    @ApiProperty({required:false})
    @Prop({required: false})
    branch: string
    
    @ApiProperty({required:false})
    @Prop({ type: MongooseSchema.Types.Mixed, required: false })
    companyOwned: any
    
    @ApiProperty({required:false})
    @Prop({ type: MongooseSchema.Types.Mixed, required: false })
    contingent_listing_type: any
     
   
    @ApiProperty({required:false})
    @Prop({ type: MongooseSchema.Types.Mixed, required: false })
    initial_scrapping: any
     


}


export const ListingsLASchema = SchemaFactory.createForClass(ListingsLA)