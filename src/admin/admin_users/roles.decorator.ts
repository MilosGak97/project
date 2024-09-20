import { SetMetadata } from '@nestjs/common'; 
import { AdminRole } from './dto/admin-role.enum';

export const Roles = (...roles: AdminRole[]) => SetMetadata('roles', roles);
