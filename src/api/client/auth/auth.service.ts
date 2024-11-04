import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenRepository } from 'src/api/repositories/postgres/token.repository';
import { EmailService } from 'src/api/email/email.service';
import { TokenType } from 'src/api/enums/token-type.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly tokenRepository: TokenRepository,
        private readonly emailService: EmailService,
    ){}
/*
    async signUp(signUpDto:SignUpDto):Promise<{
        registerToken: string
    }>{

        const { user, registerToken }  = await this.authRepository.signUp(signUpDto)
        if(!user){
            throw new BadRequestException("User registration failed")
        }


        
        // save registerToken
        const registerTokenType = TokenType.REGISTER
        const RegisterTokenExpireIn ='86400'
        await this.tokenRepository.saveToken(user, registerToken, registerTokenType, RegisterTokenExpireIn )
        

        // save jwt email verification tokens
        const userId = user.id
        const expireIn = '432000' // 5 days
        const jwtToken = await this.authRepository.signJwtToken(userId, expireIn)
        const tokenType = TokenType.EMAIL_VERIFICATION

        await this.tokenRepository.saveToken(user, jwtToken,tokenType, expireIn)

        const verifyUrl = `${process.env.BASE_URL}client/auth/email-verification?jwtToken=${encodeURIComponent(jwtToken)}`


        await this.emailService.userSignUp(user.email, )
        return {
           registerToken
        }
    }

    async registerTokenValidation(token: string):Promise<boolean>{
        return this.tokenRepository.registerTokenValidation(token)
    }
*/
}
