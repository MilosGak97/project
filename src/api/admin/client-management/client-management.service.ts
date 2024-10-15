import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../repositories/postgres/company.repository';
import { UserRepository } from '../../repositories/postgres/users.repository';
import { ListAllCompaniesDto } from './dto/list-all-companies.dto';
import { UpdateCompanyDataDto } from './dto/update-company-data.dto';
import { ListAllUsersDto } from './dto/list-all-users.dto'; 
import { User } from 'src/api/entities/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Company } from 'src/api/entities/company.entity';

@Injectable()
export class ClientManagementService {
    constructor(
        private readonly companyRepository: CompanyRepository,
        private readonly userRepository: UserRepository
    ){}

// method to list all companies    
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

// method to list single company data    
    companyData(id:string):Promise<{ 
        companyData: Company 
    }>{
        return this.companyRepository.companyData(id)
    }

// method to update single comapny data    
    async updateCompanyData(id:string, updateCompanyDataDto: UpdateCompanyDataDto):Promise<{
        message:string
    }> {
        return this.companyRepository.updateCompanyData(id, updateCompanyDataDto)
    }

// method to delete company     
    async deleteCompany(id:string): Promise<{
        message: string
    }> {
        return this.companyRepository.deleteCompany(id)
    }

// method to list all users    
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

// method to show user data    
    async showUserData(companyId:string, userId:string):Promise<{
        userData: User,
        companyData: Company
    }>{
        return this.userRepository.showUserData(companyId, userId)
    }

// method to update single user     
    async updateUser(companyId:string, userId:string, updateUserDto:UpdateUserDto):Promise<{
        message:string
    }>{
        return this.userRepository.updateUser(companyId, userId, updateUserDto)
    }

// method to update user    
    async deleteUser(companyId:string, userId:string):Promise<{
        message:string
    }>{
        return this.userRepository.deleteUser(companyId,userId)
    }


// method to reset user password    
    async resetPassword(companyId:string, userId:string):Promise<{
        message:string
    }>{
        return this.userRepository.resetPassword(companyId, userId)
    }
}
