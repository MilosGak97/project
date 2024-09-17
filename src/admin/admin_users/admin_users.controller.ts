import { Body, Controller, Post, Get } from '@nestjs/common';
import { AdminUsersService } from './admin_users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { AdminUser } from './admin_user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Admin Users')  // Groups endpoints under 'Admin Users' in Swagger UI
@Controller('/admin/admin-users')
export class AdminUsersController {
    constructor(private adminUsersService: AdminUsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new Admin User' })  // Describes what the endpoint does
    @ApiResponse({
        status: 201,
        description: 'The admin user has been successfully created.',
        type: AdminUser,  // Return type
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request: Invalid input or missing required fields.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal Server Error: Something went wrong on the server.',
    })
    createAdminUser(@Body() createAdminUserDto: CreateAdminUserDto): Promise<AdminUser> {
        return this.adminUsersService.createAdminUser(createAdminUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all Admin Users' })  // Describes what the endpoint does
    @ApiResponse({
        status: 200,
        description: 'A list of all admin users.',
        type: [AdminUser],  // Return type as an array of AdminUser
    })
    @ApiResponse({
        status: 500,
        description: 'Internal Server Error: Something went wrong on the server.',
    })
    getAllAdminUsers(): Promise<AdminUser[]> {
        return this.adminUsersService.getAllAdminUsers();
    }
}
