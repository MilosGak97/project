import { Injectable, Res } from '@nestjs/common'; 
import { AuthRepository } from './auth.repository';
import { SignInDto } from './dto/sign-in-admin.dto'; 
import { Admin } from 'src/entities/admin.entity';

@Injectable()
export class AuthService {
    constructor( 
        private readonly authRepository: AuthRepository
    ){}
    
    async verifyEmail(token){
        return this.authRepository.verifyEmail(token)
    }
  
    async signIn(signInDto:SignInDto):Promise<any>{
        return this.authRepository.signIn(signInDto)     
    }

    async whoAmI(token):Promise<Admin>{
        return this.authRepository.whoAmI(token)
    }
     
 


    }

