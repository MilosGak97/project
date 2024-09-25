import { Injectable, Inject } from '@nestjs/common';  
import { AdminRepository } from './admins.repository';
import { CreateAdminDto } from './dto/create-admin.dto'; 
import { GetAdminsDto } from './dto/get-admins.dto'; 
import { SignInDto } from '../auth/dto/sign-in-admin.dto';

@Injectable()
export class AdminsService { 
    constructor(
        private readonly adminRepository: AdminRepository,
    ) {}




    async getAdminUsers(getAdminsDto:GetAdminsDto):Promise<any>{
        return this.adminRepository.getAdminUsers(getAdminsDto)
    }

}
