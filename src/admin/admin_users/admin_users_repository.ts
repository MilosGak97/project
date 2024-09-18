import { AdminUser } from "./admin_user.entity";
import { DataSource, Repository } from "typeorm";
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { Injectable } from "@nestjs/common";
import { GetAdminUsersDto } from "./dto/get-admin-users.dto";

@Injectable()
export class AdminUserRepository extends Repository<AdminUser> {
    constructor(dataSource: DataSource) {
        super(AdminUser, dataSource.createEntityManager());
    }


    async getAdminUsers(getAdminUsersDto:GetAdminUsersDto):Promise<any>{
        const { searchQuery, role, status, limit, offset} = getAdminUsersDto

        const query = this.createQueryBuilder('adminUser')

        if(searchQuery){
            query.andWhere(
                '(adminUser.name LIKE :searchQuery OR adminUser.email LIKE :searchQuery OR adminUser.phone_number LIKE :searchQuery)',
                { searchQuery: `%${searchQuery}`}
            )
        }

        if(role){

            query.andWhere('(adminUser.role = :role)', { role });
        }

        if(status){
            query.andWhere('(adminUser.status = :status)', {status})
        }


        const totalRecords = await query.getCount()
        query.take(limit)
        query.skip(offset)

        const adminUsers = await query.getMany();

        const currentPage = Math.ceil(offset/limit) + 1

        const totalPages = Math.ceil(totalRecords / limit);

        return {
            totalRecords,
            currentPage,
            totalPages,
            adminUsers,
            limit, 
            offset
        }
    } 
}