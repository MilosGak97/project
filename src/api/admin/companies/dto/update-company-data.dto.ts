import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { AddressDto } from "./address.dto";

export class UpdateCompanyDataDto{
    
    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    name?:string

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    phone?:string

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    email?:string

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    website?:string

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    logo_url?:string

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    address?:AddressDto

    
}