import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { UserRepository } from './users.repository';
import { ListAllCompaniesDto } from './dto/list-all-companies.dto';
import { UpdateCompanyDataDto } from './dto/update-company-data.dto';
import { ListAllUsersDto } from './dto/list-all-users.dto';
import { Company } from 'src/entities/company.entity';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class ClientManagementService {
    constructor(
        private readonly companyRepository: CompanyRepository,
        private readonly userRepository: UserRepository
    ){}

    async listAllCompanies(listAllCompaniesDto:ListAllCompaniesDto):Promise<{
        result: Company[],
        totalRecords: number,
        totalPages: number,
        currentPage: number,
        numLimit: number,
        numOffset: number
    }>{
        return this.companyRepository.listAllCompanies(listAllCompaniesDto)
    }

    companyData(id:string):Promise<{ companyData: Company }>{
        return this.companyRepository.companyData(id)
    }

    async updateCompanyData(id:string, updateCompanyDataDto: UpdateCompanyDataDto):Promise<{
        message:string
    }> {
        return this.companyRepository.updateCompanyData(id, updateCompanyDataDto)
    }

    async deleteCompany(id:string): Promise<{
        message: string
    }> {
        return this.companyRepository.deleteCompany(id)
    }

    async listAllUsers(companyId:string, listAllUsersDto: ListAllUsersDto):Promise<{
        result: User[],
        totalRecords: number,
        totalPages: number,
        currentPage: number,
        
        numOffset: number,
        numLimit: number
    }>{
        return this.userRepository.listAllUsers(companyId, listAllUsersDto)
    }

    async showUserData(companyId:string, userId:string):Promise<{
        userData: User,
        companyData: Company
    }>{
        return this.userRepository.showUserData(companyId, userId)
    }

    async updateUser(companyId:string, userId:string, updateUserDto:UpdateUserDto):Promise<{
        message:string
    }>{
        return this.userRepository.updateUser(companyId, userId, updateUserDto)
    }

    async deleteUser(companyId:string, userId:string):Promise<{
        message:string
    }>{
        return this.userRepository.deleteUser(companyId,userId)
    }

    async resetPassword(companyId:string, userId:string):Promise<{
        message:string
    }>{
        return this.userRepository.resetPassword(companyId, userId)
    }
}
