import { AdminUser } from "./admin_user.entity";
import { DataSource, Repository } from "typeorm";
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminUserRepository extends Repository<AdminUser> {
    constructor(dataSource: DataSource) {
        super(AdminUser, dataSource.createEntityManager());
    }
    async createAdminUser(createAdminUserDto: CreateAdminUserDto): Promise<AdminUser> {
        console.log(createAdminUserDto); // Confirm DTO content
        const adminUser = this.create(createAdminUserDto);
        return this.save(adminUser);
    }


    async getAllAdminUsers():Promise<AdminUser[]>{
        return this.find();
    } 
}