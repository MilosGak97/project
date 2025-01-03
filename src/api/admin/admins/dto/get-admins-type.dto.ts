import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../../../enums/admin-role.enum';
import { AdminStatus } from '../../../enums/admin-status.enum';

export class GetAdminsTypeDto{
  @ApiProperty()
  id: string

  @ApiProperty()
  name:string

  @ApiProperty()
  email:string

  @ApiProperty()
  role: AdminRole

  @ApiProperty()
  status: AdminStatus

  @ApiProperty()
  phone_number: string
}