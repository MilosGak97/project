import { Injectable, Inject } from '@nestjs/common';  
import { AdminManagementRepository } from './admin-management.repository';
import { CreateAdminDto } from './dto/create-admin.dto'; 
import { GetAdminsDto } from './dto/get-admins.dto';  

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
}
