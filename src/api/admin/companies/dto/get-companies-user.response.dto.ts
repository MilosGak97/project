import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../enums/user-role.enum';
import { UserStatus } from '../../../enums/user-status.enum';

export class GetCompaniesUserResponseDto{
  @ApiProperty()
  name:string;

  @ApiProperty()
  id:string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  role: UserRole

  @ApiProperty()
  status: UserStatus
}