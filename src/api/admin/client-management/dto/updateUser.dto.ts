import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsObject, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { UserRole } from "src/api/common/enums/user-role.enum";
import { UserStatus } from "src/api/common/enums/user-status.enum";

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
    phone_number?: string


    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole

    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus

}