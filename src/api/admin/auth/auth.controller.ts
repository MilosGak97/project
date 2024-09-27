import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-admin.dto'; 
import { Request, Response } from 'express'; 
import { PasswordResetDto } from './dto/password-reset.dto';
import { GetAdmin } from './get-admin.decorator';
import { Admin } from 'src/entities/admin.entity';
import { AuthGuard } from '@nestjs/passport';

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

    @Delete()
    @ApiOperation({summary: "Logout user and delete refresh and access token"})
    @UseGuards(AuthGuard())
    async logout(@Req() req: Request, @Res() res:Response):Promise<any>{
        const token = req.cookies['accessToken']
       const removedRefreshToken = await this.authService.logout(token) 
    
       if(!removedRefreshToken){
        throw new NotFoundException('couldnt find refresh token in database')
       }

       res.clearCookie('accessToken', { httpOnly: true, secure:true, sameSite:'strict'})
       res.clearCookie('refreshToken', {httpOnly:true, sameSite:"strict", secure:true})
 // Send response back
        return res.send("User is logged out");
    }

    @Post('password')
    @ApiOperation({summary: "Change logged admin password, no old password needed for the initial "})
    @UseGuards(AuthGuard())
    async passwordReset(@Body() passwordResetDto: PasswordResetDto, @GetAdmin() admin: Admin){
        return this.authService.passwordReset(passwordResetDto, admin)
    }

    @Get('who-am-i')
    @ApiOperation({summary: 'Get information about logged user'})
    whoAmI(@Req() req: Request){
        const token = req.cookies['accessToken']
        return this.authService.whoAmI(token);
    }
 


    @Post('token')
    @ApiOperation({summary: 'Refresh Access Token'})
    async refreshAccesToken(@Req() req: Request, @Res() res: Response):Promise<any>{
       const refreshToken =  req.cookies['refreshToken']
       if(!refreshToken){
        throw new NotFoundException('No refresh token found')
       }

       const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
       res.cookie('accessToken', newAccessToken, {
        httpOnly:true,
        maxAge: 60*60*1000,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'lax', // Adjust as necessary
       })
       
       res.status(200).send('Token is refreshed')

    }
}
