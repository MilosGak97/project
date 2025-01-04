import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AddressDto {
    @ApiProperty({ required: true })
    @IsString()
    address1: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    address2?: string;

    @ApiProperty({ required: true })
    @IsString()
    city: string;

    @ApiProperty({ required: true })
    @IsString()
    state: string;

    @ApiProperty({ required: true })
    @IsString()
    zipcode: string;
}
