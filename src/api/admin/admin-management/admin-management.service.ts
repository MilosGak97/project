import { Injectable, Inject } from '@nestjs/common';  
import { AdminManagementRepository } from './admin-management.repository';
import { CreateAdminDto } from './dto/create-admin.dto'; 
import { GetAdminsDto } from './dto/get-admins.dto';  
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminManagementService { 
    constructor(
        private readonly adminManagementRepository: AdminManagementRepository, 
    ) {}



// method to get all admins
    async getAdmins(getAdminsDto:GetAdminsDto):Promise<{
        result: Admin[],
        totalRecords: number,
        currentPage: number,
        totalPages: number,
        limitNumber: number,
        offsetNumber: number

    }>{
        return await this.adminManagementRepository.getAdmins(getAdminsDto)
    }

// method to create admin
    async createAdmin(createAdminDto: CreateAdminDto): Promise<{
        message: string
    }>{
        return this.adminManagementRepository.createAdmin(createAdminDto)
    }


// method to show single admin data
    async showAdminData(id:string):Promise<{
        adminData:Admin
    }>{
        return this.adminManagementRepository.showAdminData(id)
    }


// method to update single admin data
    async updateAdmin( updateAdminDto: UpdateAdminDto, id: string):Promise<{
        message:string
    }>{
        return this.adminManagementRepository.updateAdmin(updateAdminDto, id);
    }


// method to resend email verification
    async resendEmailVerification(id:string):Promise<{
        message:string
    }>{
        return this.adminManagementRepository.resendEmailVerification(id);
    }

// method to reset password
    async resetPassword(id:string):Promise<{
        message:string
    }>{
        return this.adminManagementRepository.resetPassword(id)
    }

// method to delete admin
    async deleteAdmin(id:string):Promise<{
        message:string
    }>{
        return this.adminManagementRepository.deleteAdmin(id)
    }
}
