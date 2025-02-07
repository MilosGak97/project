import { Injectable } from '@nestjs/common';  
import { AdminRepository } from 'src/api/repositories/postgres/admin.repository';
import { CreateAdminDto } from './dto/create-admin.dto'; 
import { GetAdminsDto } from './dto/get-admins.dto';  
import { UpdateAdminDto } from './dto/update-admin.dto';
import { GetAdminsResponseDto } from './dto/get-admins-response.dto';
import { AdminResponseDto } from './dto/admin-response.dto';
import { Admin } from '../../entities/admin.entity';

@Injectable()
export class AdminsService { 
    constructor(
        private readonly adminRepository: AdminRepository, 
    ) {}



// method to get all admins
    async getAdmins(getAdminsDto:GetAdminsDto):Promise<GetAdminsResponseDto>{
        return await this.adminRepository.getAdmins(getAdminsDto)
    }

// method to create admin
    async createAdmin(createAdminDto: CreateAdminDto, admin: Admin): Promise<{
        message: string
    }>{
        return this.adminRepository.createAdmin(createAdminDto, admin)
    }


// method to show single admin data
    async getAdmin(id:string):Promise<AdminResponseDto>{
        return this.adminRepository.getAdmin(id)
    }


// method to update single admin data
    async updateAdmin( updateAdminDto: UpdateAdminDto, id: string):Promise<{
        message:string
    }>{
        return this.adminRepository.updateAdmin(updateAdminDto, id);
    }


// method to resend email verification
    async resendEmailVerification(id:string):Promise<{
        message:string
    }>{
        return this.adminRepository.resendEmailVerification(id);
    }

// method to reset password
    async resetPassword(id:string):Promise<{
        message:string
    }>{
        return this.adminRepository.resetPassword(id)
    }

// method to delete admin
    async deleteAdmin(id:string):Promise<{
        message:string
    }>{
        return await this.adminRepository.deleteAdmin(id)
    }
}
