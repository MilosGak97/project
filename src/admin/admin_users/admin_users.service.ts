import { Injectable, Inject } from '@nestjs/common';  
import { AdminUserRepository } from './admin_users_repository';
import { CreateAdminUserDto } from './dto/create-admin-user.dto'; 
import { AdminUser } from './admin_user.entity';
import { GetAdminUsersDto } from './dto/get-admin-users.dto';

@Injectable()
export class AdminUsersService { 
    constructor(
        private readonly adminUserRepository: AdminUserRepository,
    ) {}
/*
    async createAdminUser(createAdminUserDto: CreateAdminUserDto): Promise<any> {
        console.log("INJECTED PROPERLY: ", this.adminUserRepository); // Confirm it's injected properly
        return this.adminUserRepository.createAdminUser(createAdminUserDto)
    }
*/

    async getAdminUsers(getAdminUsersDto:GetAdminUsersDto):Promise<AdminUser[]>{
        return this.adminUserRepository.getAdminUsers(getAdminUsersDto)
    }
}
