import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListAllCompaniesDto } from './dto/list-all-companies.dto'; 
import { UpdateCompanyDataDto } from './dto/update-company-data.dto';
import { ListAllUsersDto } from './dto/list-all-users.dto'; 
import { User } from 'src/api/entities/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto'; 
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminRole } from 'src/api/enums/admin-role.enum';
import { Company } from 'src/api/entities/company.entity';
import { CompaniesService } from './companies.service';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { ListAllCompaniesResponseDto } from './dto/list-all-companies-response.dto';


@ApiTags('Companies')
@Controller('admin')
@UseGuards(AdminAuthGuard, RolesGuard)
@Roles(AdminRole.HEAD, AdminRole.SUPPORT)
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) { }

// GET - endpoint to list all companies    
    @Get('companies')
    @ApiOperation({ summary: 'List all companies and filter with query' })
    @ApiOkResponse({type: ListAllCompaniesResponseDto})
    async listAllCompanies(@Query() listAllCompaniesDto: ListAllCompaniesDto): Promise<ListAllCompaniesResponseDto> {
        return this.companiesService.listAllCompanies(listAllCompaniesDto)
    }

// GET - endpoint to show single company data
    @Get('companies/:id')
    @ApiOperation({ summary: "Show data of single company" })
    @ApiOkResponse({type: Company})
    async showCompanyData(@Param('id') id: string): Promise<Company> {
        return this.companiesService.companyData(id)
    }

// PATCH - endpoint to update single company data    
    @Patch('companies/:id')
    @ApiOperation({ summary: "Update single company data" }) 
    async updateCompanyData(@Param('id') id: string,
        @Body() updateCompanyDataDto: UpdateCompanyDataDto
    ):Promise<{
        message:string
    }>  {
        return this.companiesService.updateCompanyData(id, updateCompanyDataDto)
    }

// DELETE - endpoint to delete single company    
    @Delete('companies/:id')
    @ApiOperation({ summary: "Delete company, change status to deleted" })
    async deleteCompany(@Param('id') id: string): Promise<{
        message: string
    }> {
        return this.companiesService.deleteCompany(id)
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
        return this.companiesService.listAllUsers(id, listAllUsersDto)
    }


// GET - endpoint to show single user data    
    @Get('companies/:companyId/users/:id')
    @ApiOperation({summary: "Show user data including company information"})
    async showUserData(@Param('companyId') companyId:string, @Param('id') userId:string):Promise<{
        userData: User,
        companyData: Company
    }>{
        return this.companiesService.showUserData(companyId, userId)
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
        return this.companiesService.updateUser(companyId,userId,updateUserDto)
    }


// DELETE - endpoint to delete single user    
    @Delete('companies/:companyId/users/:id')
    @ApiOperation({summary: "Delete user (change UserStatus to deleted)"})
    async userDelete(
        @Param('companyId') companyId:string,
        @Param('id') userId:string
):Promise<{
    message:string
}>{
        return this.companiesService.deleteUser(companyId,userId)
    }

// POST - endpoint to reset password for single user    
    @Post('companies/:companyId/users/:id/password')
    @ApiOperation({summary: "Reset client password"})
    async resetPassword(@Param('companyId') companyId:string, @Param('id') userId:string):Promise<{
        message:string
    }>{
        return this.companiesService.resetPassword(companyId,userId)
    }

}
