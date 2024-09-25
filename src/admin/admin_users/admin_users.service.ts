import { Injectable, Inject } from '@nestjs/common';  
import { AdminUserRepository } from './admin_users_repository';
import { CreateAdminUserDto } from './dto/create-admin-user.dto'; 
import { GetAdminUsersDto } from './dto/get-admin-users.dto';
import { SignInAdminDto } from './dto/sign-in-admin.dto';

@Injectable()
export class AdminUsersService { 
    constructor(
        private readonly adminUserRepository: AdminUserRepository,
    ) {}

    async createAdminUser(createAdminUserDto: CreateAdminUserDto): Promise<any>{
        return this.adminUserRepository.createAdminUser(createAdminUserDto)
    }

    async verifyAdminEmail(token:string):Promise<any>{
        return this.adminUserRepository.verifyAdminEmail(token);
    }

    async signInAdmin(signInAdminDto:SignInAdminDto):Promise<any>{
        return this.adminUserRepository.signInAdmin(signInAdminDto)
    }

    async getAdminUsers(getAdminUsersDto:GetAdminUsersDto):Promise<any>{
        return this.adminUserRepository.getAdminUsers(getAdminUsersDto)
    }

}
