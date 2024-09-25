import { SetMetadata } from '@nestjs/common'; 
import { AdminRole } from '../../enums/admin-role.enum';

export const Roles = (...roles: AdminRole[]) => SetMetadata('roles', roles);
