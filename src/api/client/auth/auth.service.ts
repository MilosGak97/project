import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenRepository } from 'src/api/repositories/postgres/token.repository';
import { EmailService } from 'src/api/email/email.service';
import { TokenType } from 'src/api/enums/token-type.enum';
import { RegisterTokenResponseDto } from './dto/register-token-exist.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { User } from 'src/api/entities/user.entity';
import { MessageResponseDto } from 'src/api/responses/message-response.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly tokenRepository: TokenRepository,
        private readonly emailService: EmailService,
    ){}

    async signUp(signUpDto:SignUpDto):Promise<{
        registerToken: string
    }>{

        const { user, registerToken, passcode }  = await this.authRepository.signUp(signUpDto)
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

        await this.emailService.userSignUp(user.email,verifyUrl, passcode )


        return {
           registerToken
        }
    }

    async removeTokens(token:string):Promise<boolean>{
        const user = await this.authRepository.getUser(token)
        await this.tokenRepository.logoutTokens(user.id)

        return true

    }

    async signIn(signInDto: SignInDto):Promise<TokenResponseDto>{
        const {refreshToken, accessToken, user } = await this.authRepository.signIn(signInDto)

        await this.tokenRepository.saveToken(user, refreshToken, TokenType.REFRESH, '30d')
        await this.tokenRepository.saveToken(user, accessToken, TokenType.ACCESS, '1h')

        return {
            refreshToken, accessToken
        }

    }


    async emailVerification(token:string):Promise<TokenResponseDto>{
        const {accessToken, refreshToken, user} = await this.authRepository.emailVerification(token)
        await this.tokenRepository.saveToken(user, accessToken, TokenType.ACCESS, '1h')
        await this.tokenRepository.saveToken(user, refreshToken, TokenType.REFRESH, '1d')

        return {
            accessToken,
            refreshToken
        }
    }

    async setPassword(setPasswordDto: SetPasswordDto, user: User):Promise<MessageResponseDto>{
        return await this.authRepository.setPassword(setPasswordDto, user)
    }


    async registerTokenValidation(token: string):Promise<RegisterTokenResponseDto>{
        return await this.tokenRepository.registerTokenValidation(token)
    }

}
