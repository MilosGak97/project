import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddressDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    address1: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    address2?: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    zipcode: string;
}
