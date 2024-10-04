import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListAllCompaniesDto } from './dto/list-all-companies.dto';
import { ClientManagementService } from './client-management.service';
import { UpdateCompanyDataDto } from './dto/update-company-data.dto';
import { ListAllUsersDto } from './dto/list-all-users.dto';
import { Company } from 'src/entities/company.entity';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('Client Management')
@Controller('admin/client-management')
export class ClientManagementController {
    constructor(private readonly clientManagementService: ClientManagementService) { }

// GET - endpoint to list all companies    
    @Get('companies')
    @ApiOperation({ summary: 'List all companies and filter with query' })
    async listAllCompanies(@Query() listAllCompaniesDto: ListAllCompaniesDto): Promise<{
        result: Company[],
        totalRecords: number,
        totalPages: number,
        currentPage: number,
        numLimit: number,
        numOffset: number
    }> {
        return this.clientManagementService.listAllCompanies(listAllCompaniesDto)
    }

// GET - endpoint to show single company data
    @Get('companies/:id')
    @ApiOperation({ summary: "Show data of single company" })
    async showCompanyData(@Param('id') id: string): Promise<{ companyData: Company }> {
        return this.clientManagementService.companyData(id)
    }

// PATCH - endpoint to update single company data    
    @Patch('companies/:id')
    @ApiOperation({ summary: "Update single company data" })
    async updateCompanyData(@Param('id') id: string,
        @Body() updateCompanyDataDto: UpdateCompanyDataDto
    ):Promise<{
        message:string
    }>  {
        return this.clientManagementService.updateCompanyData(id, updateCompanyDataDto)
    }

// DELETE - endpoint to delete single company    
    @Delete('companies/:id')
    @ApiOperation({ summary: "Delete company, change status to deleted" })
    async deleteCompany(@Param('id') id: string): Promise<{
        message: string
    }> {
        return this.clientManagementService.deleteCompany(id)
    }


// GET - endpoint to list all users of specific company  
    @Get('companies/:id/users')
    @ApiOperation({ summary: 'List all users that belong to this company and match filter parameters' })
    async listAllUsers(@Param('id') id: string, @Query() listAllUsersDto: ListAllUsersDto):Promise<{
        result: User[],
        totalRecords: number,
        totalPages: number,
        currentPage: number,
        
        numOffset: number,
        numLimit: number
    }> {
        return this.clientManagementService.listAllUsers(id, listAllUsersDto)
    }


// GET - endpoint to show single user data    
    @Get('companies/:companyId/users/:id')
    @ApiOperation({summary: "Show user data including company information"})
    async showUserData(@Param('companyId') companyId:string, @Param('id') userId:string){
        return this.clientManagementService.showUserData(companyId, userId)
    }


// PATCH - endpoint to update single user    
    @Patch('companies/:companyId/users/:id')
    @ApiOperation({summary: 'Update user fields'})
    async updateUser(
        @Param('companyId') companyId: string, 
        @Param('id') userId:string,
        @Body() updateUserDto: UpdateUserDto
    ):Promise<{
        message: string
    }>{
        return this.clientManagementService.updateUser(companyId,userId,updateUserDto)
    }


// DELETE - endpoint to delete single user    
    @Delete('companies/:companyId/users/:id')
    @ApiOperation({summary: "Delete user (change UserStatus to deleted)"})
    async userDelete(
        @Param('companyId') companyId:string,
        @Param('id') userId:string
){
        return this.clientManagementService.deleteUser(companyId,userId)
    }

// POST - endpoint to reset password for single user    
    @Post('companies/:companyId/users/:id/password')
    async resetPassword(@Param('companyId') companyId:string, @Param('id') userId:string):Promise<{
        message:string
    }>{
        return this.clientManagementService.resetPassword(companyId,userId)
    }

}
