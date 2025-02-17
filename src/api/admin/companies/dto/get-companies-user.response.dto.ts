import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../enums/user-role.enum';
import { UserStatus } from '../../../enums/user-status.enum';
import { IsEnum } from 'class-validator';

export class GetCompaniesUserResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumberPrefix: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ enum: UserStatus })
  @IsEnum(UserStatus)
  status: UserStatus;
}
