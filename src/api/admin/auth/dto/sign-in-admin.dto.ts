import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
    @ApiProperty({required:true})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({required:true})
    @IsNotEmpty()
    password:string
}