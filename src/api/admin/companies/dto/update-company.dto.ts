import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { AddressDto } from "./address.dto";

export class UpdateCompanyDto {
    
    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    name?:string

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    phoneNumber?:string

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
    logoUrl?:string

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    address?:AddressDto

    
}