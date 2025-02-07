import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../repositories/postgres/company.repository';
import { UserRepository } from '../../repositories/postgres/users.repository';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { GetCompaniesUsersDto } from './dto/get-companies-users.dto';
import { User } from 'src/api/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Company } from 'src/api/entities/company.entity';
import { GetCompaniesResponseDto } from './dto/get-companies-response.dto';
import { GetCompaniesDto } from './dto/get-companies.dto';
import { GetCompaniesUsersResponseDto } from './dto/get-companies-users-response.dto';
import { GetCompaniesUserResponseDto } from './dto/get-companies-user.response.dto';
import { MessageResponseDto } from '../../responses/message-response.dto';

@Injectable()
export class CompaniesService {
    constructor(
        private readonly companyRepository: CompanyRepository,
        private readonly userRepository: UserRepository
    ){}

// method to list all companies    
    async getCompanies(getCompaniesDto:GetCompaniesDto):Promise<GetCompaniesResponseDto>{
        return await this.companyRepository.getCompanies(getCompaniesDto)
    }

// method to list single company data    
    async getCompany(id:string):Promise<Company>{
        return await this.companyRepository.getCompany(id)
    }

// method to update single company data
    async updateCompany(id:string, updateCompanyDataDto: UpdateCompanyDto):Promise<MessageResponseDto> {
        return await this.companyRepository.updateCompany(id, updateCompanyDataDto)
    }

// method to delete company     
    async deleteCompany(id:string): Promise<{
        message: string
    }> {
        return await this.companyRepository.deleteCompany(id)
    }

// method to list all users    
    async getCompaniesUsers(companyId:string, getCompaniesUsersDto: GetCompaniesUsersDto):Promise<GetCompaniesUsersResponseDto>{
        return await this.userRepository.getCompaniesUsers(companyId, getCompaniesUsersDto)
    }

// method to show user data    
    async getCompaniesUser(companyId:string, userId:string):Promise<GetCompaniesUserResponseDto>{
        return await this.userRepository.getCompaniesUser(companyId, userId)
    }

// method to update single user     
    async updateUser(companyId:string, userId:string, updateUserDto:UpdateUserDto):Promise<{
        message:string
    }>{
        return await this.userRepository.updateUser(companyId, userId, updateUserDto)
    }

// method to update user    
    async deleteUser(companyId:string, userId:string):Promise<{
        message:string
    }>{
        return await this.userRepository.deleteUser(companyId,userId)
    }


// method to reset user password    
    async resetPassword(companyId:string, userId:string):Promise<{
        message:string
    }>{
        return await this.userRepository.resetPassword(companyId, userId)
    }
}
