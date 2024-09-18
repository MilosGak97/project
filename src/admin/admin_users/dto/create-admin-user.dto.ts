// src/admin_users/dto/create-admin-user.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsEmail, IsPhoneNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from './admin-role.enum';

export class CreateAdminUserDto {

  @ApiProperty({ 
    required: true // Indicates this field is required
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ 
    required: true
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ 
    required: false
  })
  @IsOptional()
  @IsPhoneNumber(null) // Optional field for phone number
  phone_number?: string;

  @ApiProperty({ 
    enum: AdminRole, // Enum for available roles
    required: true
  })
  @IsNotEmpty()
  @IsEnum(AdminRole)
  role: string;

  @ApiProperty({ 
    description: 'admin_user.id, id of the admin user that is creating the account (logged in admin user)',
    example: 'fa882578-8795-46f5-b70d-f8f8e2f9d2bf', // Example UUID for created_by
    required: true
  })
  @IsNotEmpty()
  @IsString()
  created_by: string;
}



