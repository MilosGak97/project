// src/admin_users/dto/create-admin-user.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateAdminUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber(null) // Specify the country code if needed, e.g., 'US'
  phone_number: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  created_by?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
