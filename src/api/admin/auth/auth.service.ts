import { Injectable, Res } from '@nestjs/common'; 
import { AuthRepository } from './auth.repository';
import { SignInDto } from './dto/sign-in-admin.dto'; 
import { Admin } from '../entities/admin.entity';
import { PasswordResetDto } from './dto/password-reset.dto';

@Injectable()
export class AuthService {
    constructor( 
        private readonly authRepository: AuthRepository
    ){}

// new method    
    async verifyEmail(token):Promise<{
        refreshToken:string,
        accessToken: string
    }>{
        return this.authRepository.verifyEmail(token)
    }
  

// new method   
    async signIn(signInDto:SignInDto):Promise<{
        refreshToken:string,
        accessToken: string
    }>{
        return this.authRepository.signIn(signInDto)     
    }


// new method
    async logout(token):Promise<boolean>{
        return await this.authRepository.logout(token)
    }


// new method
    async passwordReset(passwordResetDto: PasswordResetDto, admin: Admin):Promise<{
        message:string
    }>{
        return this.authRepository.passwordReset(passwordResetDto, admin);
    }


// new method
    async whoAmI(token):Promise<Admin>{
        return this.authRepository.whoAmI(token)
    }
     

// new method
    async refreshAccessToken(refreshToken):Promise<{
        newAccessToken: string
    }>{
        return this.authRepository.refreshAccessToken(refreshToken)
    }


    }

