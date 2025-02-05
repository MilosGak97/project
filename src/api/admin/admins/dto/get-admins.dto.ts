import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AdminRole } from '../../../enums/admin-role.enum';
import { Type } from 'class-transformer';
import { AdminStatus } from '../../../enums/admin-status.enum';

export class GetAdminsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchQuery?: string;

  @ApiProperty({
    enum: AdminRole,
    required: false,
  })
  @IsOptional()
  @IsEnum(AdminRole)
  role?: AdminRole;

  @ApiProperty({
    enum: AdminStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(AdminStatus)
  status?: AdminStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  initialPassword?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  offset: number;
}
