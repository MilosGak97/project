import { Body, Controller, Post, Get, Query, UseGuards, Patch, Param, Delete } from '@nestjs/common'; 
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from '../../../entities/admin.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAdminsDto } from './dto/get-admins.dto'; 
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminRole } from '../../../enums/admin-role.enum';
import { AdminManagementService } from './admin-management.service'; 
import { SummaryKeyType } from '@aws-sdk/client-iam';
import { UpdateAdminDto } from './dto/update-admin.dto';



@ApiTags('Admin Management') // This will group the endpoints under "Admin Users"
@Controller('admin/admin-management') // Example route
export class AdminManagementController {
    constructor(private adminManagementService: AdminManagementService) {}



    @Get('admins')
    @ApiOperation({ summary: 'Retrieve all Admin Users that matches Query' })  // Describes what the endpoint does
    @ApiResponse({ status: 200, description: 'A list of all admin users.', type: [Admin] }) 
    @ApiResponse({ status: 401, description: 'Not authorized'}) 
    @ApiResponse({ status: 403, description: 'You do not have access to this resource'}) 
    @ApiResponse({ status: 500, description: 'Internal Server Error: Something went wrong on the server.' })
    @UseGuards(AuthGuard(), RolesGuard) 
    @Roles(AdminRole.HEAD)
    getAdminUsers(
        @Query() getAdminsDto: GetAdminsDto
    ): Promise<any> {
        return this.adminManagementService.getAdmins(getAdminsDto);
    }


    @Post('admins')
    @ApiOperation({summary: 'Create new admin user as a head admin'})
    @ApiResponse({ status: 201, description: 'Admin user created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request or validation error.' })
    @ApiResponse({ status: 409, description: 'Conflict: Email or phone number already exists.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    createAdmin(
        @Body() createAdminDto: CreateAdminDto
    ):Promise<any>{
        return this.adminManagementService.createAdmin(createAdminDto)
    }

    @Get('admins/:id')
    @ApiOperation({summary: "Show information of single admin"})
    showAdminData(@Param('id') id:string){
        return this.adminManagementService.showAdminData(id)
    }


    @Patch('admins/:id')
    @ApiOperation({summary: 'Update admin user fields or suspend/delete user'})
    updateAdmin(
        @Body() updateAdminDto: UpdateAdminDto, 
        @Param('id') id: string
    ):Promise<any>{
        return this.adminManagementService.updateAdmin(updateAdminDto, id)
    }

    @Post('admins/:id/email')
    @ApiOperation({summary: 'Re-Send email for email verification'})
    resendEmailVerification(@Param('id') id: string){
        return this.adminManagementService.resendEmailVerification(id)
        
    }

    @Post('admins/:id/password')
    @ApiOperation({summary: 'Reset password and send to email, set inital password to true'})
    resetPassword(@Param('id') id: string){
        return this.adminManagementService.resetPassword(id)
    }

    @Delete('admins/:id')
    @ApiOperation({summary: 'Delete admin, set status to deleted '})
    deleteAdmin(@Param('id') id:string):Promise<any>{
        return this.adminManagementService.deleteAdmin(id)
    }
}
