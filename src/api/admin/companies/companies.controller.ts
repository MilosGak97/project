import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCompaniesDto } from './dto/get-companies.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { GetCompaniesUsersDto } from './dto/get-companies-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminRole } from 'src/api/enums/admin-role.enum';
import { Company } from 'src/api/entities/company.entity';
import { CompaniesService } from './companies.service';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { GetCompaniesResponseDto } from './dto/get-companies-response.dto';
import { GetCompaniesUsersResponseDto } from './dto/get-companies-users-response.dto';
import { GetCompaniesUserResponseDto } from './dto/get-companies-user.response.dto';
import { MessageResponseDto } from '../../responses/message-response.dto';


@ApiTags('Companies')
@Controller('admin')
@UseGuards(AdminAuthGuard, RolesGuard)
@Roles(AdminRole.HEAD, AdminRole.SUPPORT)
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) { }

// GET - endpoint to list all companies    
    @Get('companies')
    @ApiOperation({ summary: 'List all companies and filter with query' })
    @ApiOkResponse({type: GetCompaniesResponseDto})
    async listAllCompanies(@Query() getCompaniesDto: GetCompaniesDto): Promise<GetCompaniesResponseDto> {
        return this.companiesService.getCompanies(getCompaniesDto)
    }

// GET - endpoint to show single company data
    @Get('companies/:id')
    @ApiOperation({ summary: "Show data of single company" })
    @ApiOkResponse({type: Company})
    async getCompany(@Param('id') id: string): Promise<Company> {
        return this.companiesService.getCompany(id)
    }

// PATCH - endpoint to update single company data    
    @Patch('companies/:id')
    @ApiOperation({ summary: "Update single company data" })
    @ApiOkResponse({type: MessageResponseDto})
    async updateCompany(@Param('id') id: string,
        @Body() updateCompanyDataDto: UpdateCompanyDto
    ):Promise<MessageResponseDto>  {
        return this.companiesService.updateCompany(id, updateCompanyDataDto)
    }

// DELETE - endpoint to delete single company    
    @Delete('companies/:id')
    @ApiOperation({ summary: "Delete company, change status to deleted" })
    @ApiOkResponse({type:MessageResponseDto})
    async deleteCompany(@Param('id') id: string): Promise<MessageResponseDto> {
        return this.companiesService.deleteCompany(id)
    }


// GET - endpoint to list all users of specific company  
    @Get('companies/:id/users')
    @ApiOperation({ summary: 'List all users that belong to this company and match filter parameters' })
    @ApiOkResponse({type: GetCompaniesUsersResponseDto})
    async getCompaniesUsers(@Param('id') id: string, @Query() getCompaniesUsersDto: GetCompaniesUsersDto):Promise<GetCompaniesUsersResponseDto> {
        return this.companiesService.getCompaniesUsers(id, getCompaniesUsersDto)
    }


// GET - endpoint to show single user data    
    @Get('companies/:companyId/users/:id')
    @ApiOperation({summary: "Show user data including company information"})
    @ApiOkResponse({type: GetCompaniesUserResponseDto})
    async getCompaniesUser(@Param('companyId') companyId:string, @Param('id') userId:string):Promise<GetCompaniesUserResponseDto>{
        return this.companiesService.getCompaniesUser(companyId, userId)
    }


// PATCH - endpoint to update single user    
    @Patch('companies/:companyId/users/:id')
    @ApiOperation({summary: 'Update user fields'})
    @ApiOkResponse({type:MessageResponseDto})
    async updateUser(
        @Param('companyId') companyId: string, 
        @Param('id') userId:string,
        @Body() updateUserDto: UpdateUserDto
    ):Promise<MessageResponseDto>{
        return this.companiesService.updateUser(companyId,userId,updateUserDto)
    }


// DELETE - endpoint to delete single user    
    @Delete('companies/:companyId/users/:id')
    @ApiOperation({summary: "Delete user (change UserStatus to deleted)"})
    @ApiOkResponse({type:MessageResponseDto})
    async userDelete(
        @Param('companyId') companyId:string,
        @Param('id') userId:string
):Promise<MessageResponseDto>{
        return this.companiesService.deleteUser(companyId,userId)
    }

// POST - endpoint to reset password for single user    
    @Post('companies/:companyId/users/:id/password')
    @ApiOperation({summary: "Reset client password"})
    @ApiOkResponse({type:MessageResponseDto})
    async resetPassword(@Param('companyId') companyId:string, @Param('id') userId:string):Promise<MessageResponseDto>{
        return this.companiesService.resetPassword(companyId,userId)
    }

}
