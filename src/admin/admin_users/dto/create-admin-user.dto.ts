// src/admin_users/dto/create-admin-user.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminUserDto {

  @ApiProperty({ 
    description: 'The name of the user', 
    example: 'John Doe', // Example value to help frontend devs
    required: true       // Indicates that this field is required
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'The email of the user', 
    example: 'johndoe@example.com',
    required: true
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ 
    description: 'The phone number of the user (International format with country code)', 
    example: '+1234567890', 
    required: true
  })
  @IsNotEmpty()
  @IsPhoneNumber(null) // Specify the country code if needed, e.g., 'US'
  phone_number: string;

  @ApiProperty({ 
    description: 'The password of the user. If not provided, system will generate one.',
    example: 'strongPassword123!', // Example value
    required: false,
    default: 'Auto-generated if not provided' // Helpful default value message
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ 
    description: 'The role of the user (e.g., admin, manager, user)', 
    example: 'admin', 
    required: false,
    enum: ['admin', 'manager', 'user']  // Helps indicate valid role options
  })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ 
    description: 'ID of the admin who created this user (auto-populated by system)', 
    example: 'system_user_id', 
    required: false
  })
  @IsOptional()
  @IsString()
  created_by?: string;

  @ApiProperty({ 
    description: 'The status of the user account (e.g., active, suspended)', 
    example: 'active', 
    required: false,
    enum: ['active', 'suspended', 'pending'] // Provide valid statuses
  })
  @IsOptional()
  @IsString()
  status?: string;
}
