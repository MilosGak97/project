import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class PasswordResetDto{
    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    oldPassword: string

    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character' })
    newPassword: string
    
    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty() 
    newPasswordRepeat: string




}