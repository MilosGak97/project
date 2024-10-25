import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async signUp(signUpDto:SignUpDto){
        
    }

}
