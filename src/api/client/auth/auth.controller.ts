import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express'; 
import { MessageResponseDto } from 'src/api/responses/message-response.dto';
import { User } from 'src/api/entities/company-entities/user.entity';
import { RegisterTokenResponseDto } from './dto/register-token-exist.dto'; 
import { SetPasswordDto } from './dto/set-password.dto';
import { GetUser } from './get-user.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { UserAuthGuard } from './user-auth.guard'; 
import { PasscodeDto } from './dto/passcode-dto';
import { ForgotPasswordDto } from './dto/forgot-password-dto';

@ApiTags('Auth')
@Controller('client/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @ApiOperation({ summary: "Sign up with email only" })
    @ApiOkResponse({ type: MessageResponseDto })
    @Post()
    async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response): Promise<Response<MessageResponseDto>> {

        const { registerToken } = await this.authService.signUp(signUpDto)

        if (!registerToken) {
            throw new BadRequestException("User creation failed")
        }

        res.cookie('registerToken', registerToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 86400 * 1000 //24hr
        })


        return res.json({ message: "User is created" })
    }

    @ApiOperation({ summary: "Sign In endpoint"})
    @ApiOkResponse({type: MessageResponseDto})
    @Post('signin')
    async signIn(@Body() signInDto: SignInDto, @Res() res: Response):Promise<Response<MessageResponseDto>>{
        const { accessToken, refreshToken } = await this.authService.signIn(signInDto)
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 1000
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return res.json({
            message: "Signed in successfully"
        })
    }

    @ApiOperation({summary: "Logout endpoint"})
    @ApiOkResponse({type: MessageResponseDto})
    @UseGuards(UserAuthGuard)
    @Delete('')
    async logout(@Req() req: Request, @Res() res: Response):Promise<Response<MessageResponseDto>>{
        const token = req.cookies['accessToken']
        
        const removeTokens = await this.authService.removeTokens(token)

        if(!removeTokens){
            throw new BadRequestException("Tokens are not removed from database")
        }
        res.clearCookie('refreshToken',{
            httpOnly:true,
            secure:true,
            sameSite: 'none'
        })

        res.clearCookie('accessToken', {
            httpOnly:true, 
            secure: true,
            sameSite:'none'
        })
        
        return res.json({
            message: "Logged out successfully"
        })
    }



    @ApiOperation({summary: "Verify email with Passcode"})
    @ApiOkResponse({type:MessageResponseDto})
    @Post('email-verification')
    async passcodeVerification(@Body() passcodeDto:PasscodeDto, @Res() res: Response, @Req() req: Request ):Promise<Response<MessageResponseDto>>{
        const registerToken = req.cookies['registerToken']
        const {accessToken, refreshToken } = await this.authService.passcodeVerification(passcodeDto, registerToken)



        res.clearCookie('registerToken', {
            httpOnly:true,
            secure: true,
            sameSite: 'none'
        })

        res.cookie('accessToken', accessToken, {
            httpOnly:true,
            secure:true,
            sameSite: 'none',
            maxAge: 60 * 60 * 1000
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly:true,
            secure:true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return res.json({message: 'Email verified and logged in successfully'})
    }

    @ApiOperation({ summary: "Confirm email from url sent to email and login" })
    @ApiOkResponse({ type: MessageResponseDto })
    @Get('email-verification/:token')
    async emailVerification(@Param('token') token: string, @Res() res: Response): Promise<Response<MessageResponseDto>> {
        const { refreshToken, accessToken } = await this.authService.emailVerification(token)

        res.clearCookie('registerToken', {
            httpOnly:true,
            secure: true,
            sameSite: 'none'
        })

        // Set the HTTP-only cookie for the access token
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true, // Use secure cookies in production
            sameSite: 'none', // Adjust as necessary
            maxAge: 60 * 60 * 1000 // 1 hour for access token
        });

        // Set the HTTP-only cookie for the refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Use secure cookies in production
            sameSite: 'none', // Adjust as necessary
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refresh token
        });
        return res.json({ message: 'Email verified and logged in successfully' });
    }
 
 
    @ApiOperation({summary: "Set password for UserStatus='NO_PASSWORD' users"})
    @ApiOkResponse({type: MessageResponseDto})
    @Post('password')
    @UseGuards(UserAuthGuard)
    async setPassword(@Body() setPasswordDto: SetPasswordDto, @GetUser() user: User):Promise<MessageResponseDto>{
        return await this.authService.setPassword(setPasswordDto, user)
    }

    @ApiOperation({summary: "Forgot Password Request Url"})
    @ApiOkResponse({type: MessageResponseDto})
    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto:ForgotPasswordDto):Promise<MessageResponseDto>{
        return await this.authService.forgotPasswordToken(forgotPasswordDto)
    }

    @ApiOperation({summary: "Forgot Password Url verification"})
    @ApiOkResponse({type: MessageResponseDto})
    @Get('forgot-password/:token')
    async forgotPasswordVerification(@Param('token') token: string, @Res() res: Response){
        const {accessToken, refreshToken} = await this.authService.forgotPasswordVerification(token)
        
        // Set the HTTP-only cookie for the access token
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true, // Use secure cookies in production
            sameSite: 'none', // Adjust as necessary
            maxAge: 60 * 60 * 1000 // 1 hour for access token
        });

        // Set the HTTP-only cookie for the refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Use secure cookies in production
            sameSite: 'none', // Adjust as necessary
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refresh token
        }); 

        return res.json({message: "You are logged in, now you can change your password"})
    }

    // new end point
    @Get('registerToken')
    @ApiOperation({ summary: 'Check if registerToken exist and if it is valid' })
    @ApiOkResponse({ type: RegisterTokenResponseDto })
    async registerToken(@Req() req: Request): Promise<RegisterTokenResponseDto> {
        const token = req.cookies['registerToken']
        const { registerTokenExist, message, userId } = await this.authService.registerTokenValidation(token);
        return {
            message,
            registerTokenExist,
            userId
        }
    }
}
