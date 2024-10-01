import { Injectable, Inject } from '@nestjs/common';  
import { AdminManagementRepository } from './admin-management.repository';
import { CreateAdminDto } from './dto/create-admin.dto'; 
import { GetAdminsDto } from './dto/get-admins.dto';  
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminManagementService { 
    constructor(
        private readonly adminManagementRepository: AdminManagementRepository, 
    ) {}




    async getAdmins(getAdminsDto:GetAdminsDto):Promise<any>{
        return this.adminManagementRepository.getAdmins(getAdminsDto)
    }

    async createAdmin(createAdminDto: CreateAdminDto): Promise<any>{
        return this.adminManagementRepository.createAdmin(createAdminDto)
    }

    async showAdminData(id:string):Promise<any>{
        return this.adminManagementRepository.showAdminData(id)
    }

    async updateAdmin( updateAdminDto: UpdateAdminDto, id: string){
        return this.adminManagementRepository.updateAdmin(updateAdminDto, id);
    }

    async resendEmailVerification(id:string):Promise<any>{
        return this.adminManagementRepository.resendEmailVerification(id);
    }

    async resetPassword(id:string):Promise<any>{
        return this.adminManagementRepository.resetPassword(id)
    }

    async deleteAdmin(id:string):Promise<any>{
        return this.adminManagementRepository.deleteAdmin(id)
    }
}
