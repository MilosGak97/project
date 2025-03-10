import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../../../enums/admin-role.enum';
import { AdminStatus } from '../../../enums/admin-status.enum';
import { IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phoneCountryCode: string;

  @ApiProperty()
  @IsString()
  phoneNumberPrefix: string;

  @ApiProperty()
  @IsString()
  @Type((): StringConstructor => String)
  phoneNumber: string;

  @ApiProperty({ enum: AdminRole })
  @IsEnum(AdminRole)
  role: AdminRole;

  @ApiProperty({ enum: AdminStatus })
  @IsEnum(AdminStatus)
  status: AdminStatus;
}
