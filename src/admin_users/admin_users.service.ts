import { Injectable, Inject } from '@nestjs/common';  
import { AdminUserRepository } from './admin_users_repository';
import { CreateAdminUserDto } from './dto/create-admin-user.dto'; 
import { AdminUser } from './admin_user.entity';

@Injectable()
export class AdminUsersService { 
    constructor(
        private readonly adminUserRepository: AdminUserRepository,
    ) {}

    async createAdminUser(createAdminUserDto: CreateAdminUserDto): Promise<AdminUser> {
        console.log("INJECTED PROPERLY: ", this.adminUserRepository); // Confirm it's injected properly
        return this.adminUserRepository.createAdminUser(createAdminUserDto)
    }


    async getAllAdminUsers():Promise<AdminUser[]>{
        return this.adminUserRepository.getAllAdminUsers()
    }
}
