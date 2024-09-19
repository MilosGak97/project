import { Body, Controller, Post, Get, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminUsersService } from './admin_users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { AdminUser } from './admin_user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAdminUsersDto } from './dto/get-admin-users.dto';

@ApiTags('Admin Users')  // Groups endpoints under 'Admin Users' in Swagger UI
@Controller('/admin/admin-users')
export class AdminUsersController {
    constructor(private adminUsersService: AdminUsersService) {}

    @Post()
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
    @ApiResponse({ status: 500, description: 'Internal Server Error: Something went wrong on the server.' })
    
    getAdminUsers(@Query() getAdminUsersDto: GetAdminUsersDto): Promise<any> {
        return this.adminUsersService.getAdminUsers(getAdminUsersDto);
    }


    @Get('verify')
    
    @ApiOperation({ summary: "Verify user email with JWT Token"})
    @ApiResponse({status: 200, description: 'User email is authorized'})
    @ApiResponse({status: 401, description: 'Unauthorized - Expired or invalid token'})
    @ApiResponse({status: 500, description: 'Internal Server Error'})
    verifyEmail(@Query('jwtToken') token:string){
        
        return this.adminUsersService.verifyAdminEmail(token)
    }

}
