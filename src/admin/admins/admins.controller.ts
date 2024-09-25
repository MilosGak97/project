import { Body, Controller, Post, Get, Query, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from '../../entities/admin.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAdminsDto } from './dto/get-admins.dto';
import { SignInDto } from '../auth/dto/sign-in-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminRole } from '../../enums/admin-role.enum';


@ApiTags('Admins') // This will group the endpoints under "Admin Users"
@Controller('admins') // Example route
export class AdminsController {
    constructor(private adminsService: AdminsService) {}



    @Get()
    @ApiOperation({ summary: 'Retrieve all Admin Users that matches Query' })  // Describes what the endpoint does
    @ApiResponse({ status: 200, description: 'A list of all admin users.', type: [Admin] }) 
    @ApiResponse({ status: 401, description: 'Not authorized'}) 
    @ApiResponse({ status: 403, description: 'You do not have access to this resource'}) 
    @ApiResponse({ status: 500, description: 'Internal Server Error: Something went wrong on the server.' })
    @UseGuards(AuthGuard(), RolesGuard) 
    @Roles(AdminRole.HEAD)
    getAdminUsers(@Query() getAdminUsersDto: GetAdminsDto): Promise<any> {
        return this.adminsService.getAdminUsers(getAdminUsersDto);
    }





}
