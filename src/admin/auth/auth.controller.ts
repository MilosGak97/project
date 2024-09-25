import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-admin.dto';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService ){}

    @Get('verify')
    
    @ApiOperation({ summary: "Verify user email with JWT Token"})
    @ApiResponse({status: 200, description: 'User email is authorized'})
    @ApiResponse({status: 401, description: 'Unauthorized - Expired or invalid token'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    verifyEmail(@Query('jwtToken') token:string){
        
        return this.authService.verifyAdminEmail(token)
    }

    @Post('signin')
    @ApiOperation({summary:"Sign in admin end point"})
    @ApiResponse({status:401, description: 'Unauthorized'})
    signInAdmin(@Body() signInAdminDto: SignInDto):Promise<any>{
        return this.authService.signInAdmin(signInAdminDto)
    }

    
    @Post('create')
    @ApiOperation({summary: 'Create new adminusers as a head admin'})
    @ApiResponse({ status: 201, description: 'Admin user created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request or validation error.' })
    @ApiResponse({ status: 409, description: 'Conflict: Email or phone number already exists.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    createAdminUser(@Body() createAdminUserDto: CreateAdminDto):Promise<any>{
        return this.authService.createAdminUser(createAdminUserDto)
    }
}
