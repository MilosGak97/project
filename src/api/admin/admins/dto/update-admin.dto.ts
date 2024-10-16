import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { AdminRole } from "src/api/enums/admin-role.enum";
import { AdminStatus } from "src/api/enums/admin-status.enum";

export class UpdateAdminDto{
    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    @IsEmail()
    email?:string

    @ApiProperty({required:false})
    @IsOptional()
    @IsPhoneNumber('US')
    phone_number?: string

    @ApiProperty({ 
        enum: AdminRole, // Enum for available roles
        required: false
      })
      @IsOptional()
      @IsEnum(AdminRole)
      role?: AdminRole;


      @ApiProperty({
        enum:AdminStatus,
        required: false
      })
      @IsOptional()
      @IsEnum(AdminStatus)
      status?: AdminStatus
}