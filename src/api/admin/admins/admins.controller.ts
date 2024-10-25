import { Body, Controller, Post, Get, Query, UseGuards, Patch, Param, Delete } from '@nestjs/common'; 
import { CreateAdminDto } from './dto/create-admin.dto'; 
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAdminsDto } from './dto/get-admins.dto'; 
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminRole } from '../../enums/admin-role.enum';
import { AdminsService } from './admins.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from 'src/api/entities/admin.entity';



@ApiTags('Admins') 
@Controller('admin') 
@UseGuards(AuthGuard(), RolesGuard) 
@Roles(AdminRole.HEAD)
export class AdminsController {
    constructor(private adminsService: AdminsService) {}


// GET - end point to get all admins
    @Get('admins')
    @ApiOperation({ summary: 'Retrieve all Admin Users that matches Query' })  
    @ApiResponse({ status: 200, description: 'A list of all admin users.', type: [Admin] }) 
    @ApiResponse({ status: 401, description: 'Not authorized'}) 
    @ApiResponse({ status: 403, description: 'You do not have access to this resource'}) 
    @ApiResponse({ status: 500, description: 'Internal Server Error: Something went wrong on the server.' })
    getAdminUsers(
        @Query() getAdminsDto: GetAdminsDto
    ):Promise<{
        result: Admin[],
        totalRecords: number,
        currentPage: number,
        totalPages: number,
        limitNumber: number,
        offsetNumber: number

    }> {
        return this.adminsService.getAdmins(getAdminsDto);
    }

// POST - end point to create new admin
    @Post('admins')
    @ApiOperation({summary: 'Create new admin user as a head admin'})
    @ApiResponse({ status: 201, description: 'Admin user created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request or validation error.' })
    @ApiResponse({ status: 409, description: 'Conflict: Email or phone number already exists.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    createAdmin(
        @Body() createAdminDto: CreateAdminDto
    ):Promise<{
        message: string
    }>{
        return this.adminsService.createAdmin(createAdminDto)
    }

// GET - end point to show information of single admin    
    @Get('admins/:id')
    @ApiOperation({summary: "Show information of single admin"})
    showAdminData(@Param('id') id:string):Promise<{
        adminData: Admin
    }>{
        return this.adminsService.showAdminData(id)
    }


// PATCH - end point to update admin users field    
    @Patch('admins/:id')
    @ApiOperation({summary: 'Update admin user fields or suspend user'})
    updateAdmin(
        @Body() updateAdminDto: UpdateAdminDto, 
        @Param('id') id: string
    ):Promise<{
        message: string
    }>{
        return this.adminsService.updateAdmin(updateAdminDto, id)
    }

// POST - end point to resend email for email verification    
    @Post('admins/:id/email')
    @ApiOperation({summary: 'Re-Send email for email verification'})
    resendEmailVerification(@Param('id') id: string):Promise<{
        message:string
    }>{
        return this.adminsService.resendEmailVerification(id)
        
    }

// POST - end point to reset password of admin    
    @Post('admins/:id/password')
    @ApiOperation({summary: 'Reset password and send to email, set inital password to true'})
    resetPassword(@Param('id') id: string):Promise<{
        message:string
    }>{
        return this.adminsService.resetPassword(id)
    }

// DELETE - end point to delete admin user    
    @Delete('admins/:id')
    @ApiOperation({summary: 'Delete admin, set status to deleted '})
   async deleteAdmin(@Param('id') id:string):Promise<{
        message:string
    }>{
        return await this.adminsService.deleteAdmin(id)
    }
}
