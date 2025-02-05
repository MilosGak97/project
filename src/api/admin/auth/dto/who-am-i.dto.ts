import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../../../enums/admin-role.enum';
import { UserType } from '../../../enums/user-type.enum';
import { AdminStatus } from '../../../enums/admin-status.enum';

export class WhoAmIDto{
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  emailVerified: boolean

  @ApiProperty()
  phoneNumber: string

  @ApiProperty({type: 'enum', enum: AdminRole})
  role: AdminRole

  @ApiProperty({type:'enum', enum: UserType})
  userType: UserType

  @ApiProperty({type:'enum', enum: AdminStatus})
  status: AdminStatus

  @ApiProperty()
  refreshToken: string

  @ApiProperty()
  initialPassword: boolean


}