import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminUser } from './admin_user.entity'; 
import { AdminRole } from './dto/admin-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<AdminRole[]>('roles', context.getHandler());
    if (!roles) {
      return true; // No roles are specified, so allow access by default
    }

    const request = context.switchToHttp().getRequest();
    const user: AdminUser = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException('You do not have access to this resource');
    }

    return true;  // User has the necessary role
  } 
} 
