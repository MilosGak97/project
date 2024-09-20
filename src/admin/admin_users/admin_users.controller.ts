import { Body, Controller, Post, Get, Param, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AdminUsersService } from './admin_users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { AdminUser } from './admin_user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAdminUsersDto } from './dto/get-admin-users.dto';
import { SignInAdminDto } from './dto/sign-in-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { AdminRole } from './dto/admin-role.enum';

@ApiTags('Admin Users')  // Groups endpoints under 'Admin Users' in Swagger UI
@Controller('/admin/admin-users')
export class AdminUsersController {
    constructor(private adminUsersService: AdminUsersService) {}

    @Post('create')
    @ApiOperation({summary: 'Create new adminusers as a head admin'})
    @ApiResponse({ status: 201, description: 'Admin user created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request or validation error.' })
    @ApiResponse({ status: 409, description: 'Conflict: Email or phone number already exists.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
  
    createAdminUser(@Body() createAdminUserDto: CreateAdminUserDto):Promise<any>{
        return this.adminUsersService.createAdminUser(createAdminUserDto)
    }


    @Get()
    @ApiOperation({ summary: 'Retrieve all Admin Users that matches Query' })  // Describes what the endpoint does
    @ApiResponse({ status: 200, description: 'A list of all admin users.', type: [AdminUser] }) 
    @ApiResponse({ status: 401, description: 'Not authorized'}) 
    @ApiResponse({ status: 403, description: 'You do not have access to this resource'}) 
    @ApiResponse({ status: 500, description: 'Internal Server Error: Something went wrong on the server.' })
    @UseGuards(AuthGuard(), RolesGuard) 
    @Roles(AdminRole.HEAD)
    getAdminUsers(@Query() getAdminUsersDto: GetAdminUsersDto): Promise<any> {
        return this.adminUsersService.getAdminUsers(getAdminUsersDto);
    }

/*
    @Get('verify')
    
    @ApiOperation({ summary: "Verify user email with JWT Token"})
    @ApiResponse({status: 200, description: 'User email is authorized'})
    @ApiResponse({status: 401, description: 'Unauthorized - Expired or invalid token'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    verifyEmail(@Query('jwtToken') token:string){
        
        return this.adminUsersService.verifyAdminEmail(token)
    }
*/

    @Post('signin')
    @ApiOperation({summary:"Sign in admin end point"})
    @ApiResponse({status:401, description: 'Unauthorized'})
    signInAdmin(@Body() signInAdminDto: SignInAdminDto):Promise<any>{
        return this.adminUsersService.signInAdmin(signInAdminDto)
    }
}
