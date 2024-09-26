import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-admin.dto'; 
import { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('admin/auth')
export class AuthController {
    constructor( private readonly authService: AuthService ){}

    @Get('email')
    
    @ApiOperation({ summary: "Verify user email with JWT Token"})
    @ApiResponse({status: 200, description: 'User email is authorized'})
    @ApiResponse({status: 401, description: 'Unauthorized - Expired or invalid token'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    async verifyEmail(@Query('jwtToken') token:string, @Res() res: Response){
        
        const {accessToken, refreshToken} = await this.authService.verifyEmail(token)

       // Set the HTTP-only cookie for the access token
       res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'lax', // Adjust as necessary
        maxAge: 60 * 60 * 1000 // 1 hour for access token
    });

    // Set the HTTP-only cookie for the refresh token
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'lax', // Adjust as necessary
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refresh token
    });

    // Optionally send a response
    
            return res.send({ message: 'Sign-in successful!' }); // You can customize the response as needed
       
    }

    @Post()
    @ApiOperation({summary:"Sign in admin end point"})
    @ApiResponse({status:401, description: 'Unauthorized'})
    async signIn(@Body() signInAdminDto: SignInDto, @Res() res: Response):Promise<any>{
        const { accessToken, refreshToken } = await this.authService.signIn(signInAdminDto);

        // Set the HTTP-only cookie for the access token
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'lax', // Adjust as necessary
            maxAge: 60 * 60 * 1000 // 1 hour for access token
        });

        // Set the HTTP-only cookie for the refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'lax', // Adjust as necessary
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refresh token
        });

        // Optionally send a response
        return res.status(HttpStatus.OK).send({ message: 'Login successful' });

    }

    @Get('who-am-i')
    @ApiOperation({summary: 'Get information about logged user'})
    whoAmI(@Req() req: Request){
        const token = req.cookies['accessToken']
        return this.authService.whoAmI(token);
    }
 
}
