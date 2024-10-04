import { Injectable, Res } from '@nestjs/common'; 
import { AuthRepository } from './auth.repository';
import { SignInDto } from './dto/sign-in-admin.dto'; 
import { Admin } from 'src/entities/admin.entity';
import { PasswordResetDto } from './dto/password-reset.dto';

@Injectable()
export class AuthService {
    constructor( 
        private readonly authRepository: AuthRepository
    ){}
    
    async verifyEmail(token):Promise<{
        refreshToken:string,
        accessToken: string
    }>{
        return this.authRepository.verifyEmail(token)
    }
  
    async signIn(signInDto:SignInDto):Promise<{
        refreshToken:string,
        accessToken: string
    }>{
        return this.authRepository.signIn(signInDto)     
    }
    async logout(token):Promise<boolean>{
        return await this.authRepository.logout(token)
    }

    async passwordReset(passwordResetDto: PasswordResetDto, admin: Admin):Promise<{
        message:string
    }>{
        return this.authRepository.passwordReset(passwordResetDto, admin);
    }

    async whoAmI(token):Promise<Admin>{
        return this.authRepository.whoAmI(token)
    }
     
    async refreshAccessToken(refreshToken):Promise<{
        newAccessToken: string
    }>{
        return this.authRepository.refreshAccessToken(refreshToken)
    }


    }

