import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../enums/user-role.enum';
import { UserStatus } from '../../../enums/user-status.enum';

export class CompaniesUsersTypeDto{
  @ApiProperty()
  id:string

  @ApiProperty()
  name?: string

  @ApiProperty()
  email: string

  @ApiProperty()
  phoneNumber?: string

  @ApiProperty()
  emailVerified: boolean

  @ApiProperty()
  role: UserRole

  @ApiProperty()
  status: UserStatus


}