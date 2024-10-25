import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService){}


    @ApiOperation({summary: "Sign up with email only"})
    @Post()
    async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response){

        const verificationToken = "sagsag"

        res.cookie('verificationToken', verificationToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 60 * 1000 //30min
        })

 
        return 
    }

}
