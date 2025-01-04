
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../../../enums/admin-role.enum';
import { AdminStatus } from '../../../enums/admin-status.enum';

@ApiExtraModels(GetAdminsTypeDto)
export class GetAdminsTypeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: AdminRole })
  role: AdminRole;

  @ApiProperty({ enum: AdminStatus })
  status: AdminStatus;

  @ApiProperty()
  phone_number: string;
}
