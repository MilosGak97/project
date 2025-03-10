import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
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
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  role?: AdminRole[];

  @ApiProperty({
    isArray: true,
    required: false,
    enum: AdminStatus,
  })
  @IsOptional()
  @IsArray()
  status?: AdminStatus[];

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
