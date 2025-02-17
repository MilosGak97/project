import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
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
  phoneNumberPrefix?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    enum: AdminRole, // Enum for available roles
    required: false,
  })
  @IsOptional()
  @IsEnum(AdminRole)
  role?: AdminRole;
}
