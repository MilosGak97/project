import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "src/api/enums/user-role.enum";
import { UserStatus } from "src/api/enums/user-status.enum";

export class GetCompaniesUsersDto {
    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    searchQuery: string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @Type(() => Number)
    limit: number

    @ApiProperty({required:true})
    @IsNotEmpty()
    @Type(() => Number)
    offset: number

    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(UserStatus)
    status: UserStatus

    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole

    @ApiProperty({required:false})
    @IsOptional()
    @IsBoolean()
    initial_password: boolean

    @ApiProperty({required:false})
    @IsOptional()
    @IsBoolean()
    email_verified: boolean

}