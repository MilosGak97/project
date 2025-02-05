import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { UserRole } from "src/api/enums/user-role.enum";
import { UserStatus } from "src/api/enums/user-status.enum";

export class UpdateUserDto{
    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({required:false})
    @IsOptional()
    @IsEmail()
    email?: string

    @ApiProperty({required:false})
    @IsOptional()
    @IsPhoneNumber('US')
    phoneNumber?: string


    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole

    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus

}