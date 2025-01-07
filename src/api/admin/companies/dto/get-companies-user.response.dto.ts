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
  phone_number: string;

  @ApiProperty()
  email_verified: boolean;

  @ApiProperty()
  role: UserRole

  @ApiProperty()
  status: UserStatus
}