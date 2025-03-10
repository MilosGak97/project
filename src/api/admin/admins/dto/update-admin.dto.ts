import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { AdminRole } from 'src/api/enums/admin-role.enum';

export class UpdateAdminDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

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
    required: false,
  })
  @IsOptional()
  @IsEnum(AdminRole)
  role?: AdminRole;
}
