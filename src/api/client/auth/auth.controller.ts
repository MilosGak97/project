import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { RegisterGuard } from './register.guard';

@ApiTags('Auth')
@Controller('client/auth')
export class AuthController {
    constructor( private readonly authService: AuthService){}

/*
    @ApiOperation({summary: "Sign up with email only"})
    @Post()
    async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response):Promise<any>{

        const {registerToken} = await this.authService.signUp(signUpDto)

        if(!registerToken){
            throw new BadRequestException("User creation failed")
        }
         
            res.cookie('registerToken', registerToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 86400 * 1000 //24hr
            })
    
     
           res.json({message: "User is created"})
        }

        @UseGuards(RegisterGuard)
        @ApiOperation({ summary: "After registration page, confirm email" })
        @Get('email-verification')
        async emailVerification(@Req() req: Request) {
            const registerToken = req.cookies['registerToken'];
            return { message: 'Email verified successfully', registerToken };
        }
    
*/
}
