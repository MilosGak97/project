// src/admin_users/dto/create-admin-user.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../../../enums/admin-role.enum';

export class CreateAdminDto {
  @ApiProperty({
    required: true, // Indicates this field is required
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber('US') // Optional field for phone number
  phoneNumber?: string;

  @ApiProperty({
    enum: AdminRole, // Enum for available roles
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(AdminRole)
  role: AdminRole;

}
