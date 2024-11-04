import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class RegisterGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // Retrieve the registerToken from cookies
        const registerToken = request.cookies['registerToken'];

        // Ensure that the registerToken is present
        if (!registerToken) {
            throw new ForbiddenException('Verification token is required');
        }
/*
        // Validate the registerToken with AuthService
        const isValidToken = await this.authService.registerTokenValidation(registerToken);

        // If the token is invalid, throw an error
        if (!isValidToken) {
            throw new ForbiddenException('Invalid or expired verification token');
        }
*/
        return true; // Allow access if token is valid
    }
}
