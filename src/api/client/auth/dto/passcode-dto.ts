import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PasscodeDto{
    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty() 
    passcode: string
}