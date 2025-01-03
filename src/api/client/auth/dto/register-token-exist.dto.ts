import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class RegisterTokenResponseDto{
    @ApiProperty()
    @IsString()
    message: string

    @ApiProperty()
    @IsBoolean()
    registerTokenExist: boolean

    @ApiProperty()
    @IsString()
    @IsOptional()
    userId: string
}