import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SetPasswordDto{
    @ApiProperty({nullable:false})
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({nullable:false})
    @IsString()
    @IsNotEmpty()
    repeatPassword: string
}