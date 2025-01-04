import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../../../enums/admin-role.enum';
import { AdminStatus } from '../../../enums/admin-status.enum';

export class AdminDto{

  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  phone_number: string

  @ApiProperty({type: 'enum', enum: AdminRole})
  role: AdminRole

  @ApiProperty({type: 'enum', enum: AdminStatus})
  status: AdminStatus
}