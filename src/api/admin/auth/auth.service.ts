import { Injectable, Res } from '@nestjs/common'; 
import { AuthRepository } from './repository/auth.repository';
import { SignInDto } from './dto/sign-in-admin.dto';  
import { PasswordResetDto } from './dto/password-reset.dto'; 
import { Admin } from 'src/api/entities/admin.entity';
import { MessageResponseDto } from 'src/api/responses/message-response.dto';
import { WhoAmIDto } from './dto/who-am-i.dto';

@Injectable()
export class AuthService {
    constructor( 
        private readonly authRepository: AuthRepository
    ){}

// new method    
    async verifyEmail(token:string):Promise<{
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
        return await this.authRepository.signIn(signInDto)     
    }


// new method
    async logout(token:string):Promise<boolean>{
        return await this.authRepository.logout(token)
    }


// new method
    async passwordReset(passwordResetDto: PasswordResetDto, admin: Admin):Promise<MessageResponseDto>{
        return await this.authRepository.passwordReset(passwordResetDto, admin);
    }


// new method
    async whoAmI(token:string):Promise<WhoAmIDto>{
        return await this.authRepository.whoAmI(token)
    }
     

// new method
    async refreshAccessToken(refreshToken:string):Promise<{
        newAccessToken: string
    }>{
        return await this.authRepository.refreshAccessToken(refreshToken)
    }


    }

