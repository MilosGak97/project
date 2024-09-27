import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Redirect, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Admin } from '../../../entities/admin.entity'; 
import { AdminRole } from '../../../enums/admin-role.enum';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<AdminRole[]>('roles', context.getHandler());
        if (!roles) {
            return true; // No roles specified, allow access by default
        }

        const request = context.switchToHttp().getRequest();
        const user: Admin = request.user; // Get the user from request

        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }

        if (!roles.includes(user.role)) {
            throw new ForbiddenException('You do not have access to this resource');
        }

        if(user.initial_password){
            throw new UnauthorizedException('Initial password is true')
        }

        return true; // User has the necessary role
    }
}

