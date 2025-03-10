// src/admin_users/dto/create-admin-user.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  Length,
  IsNumberString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../../../enums/admin-role.enum';
import { Column } from 'typeorm';

export class CreateAdminDto {
  @ApiProperty({
    required: true, // Indicates this field is required
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phoneCountryCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phoneNumberPrefix?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  @Length(4, 15) // Enforces min length of 4 and max of 15
  phoneNumber?: string;

  @ApiProperty({
    enum: AdminRole, // Enum for available roles
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(AdminRole)
  role: AdminRole;
}
