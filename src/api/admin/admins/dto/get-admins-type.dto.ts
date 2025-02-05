
import {  ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../../../enums/admin-role.enum';
import { AdminStatus } from '../../../enums/admin-status.enum';
import { IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAdminsTypeDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  id: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  email: string;

  @ApiProperty({ enum: AdminRole })
  @IsEnum(AdminRole)
  role: AdminRole;

  @ApiProperty({ enum: AdminStatus })
  @IsEnum(AdminStatus)
  status: AdminStatus;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  phoneNumber: string;
}
