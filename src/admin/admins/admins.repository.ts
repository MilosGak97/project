import { Admin } from "../../entities/admin.entity";
import { DataSource, Repository } from "typeorm";
import { CreateAdminDto } from './dto/create-admin.dto';
import { Injectable , HttpException, HttpStatus, NotFoundException, UnauthorizedException, Logger} from "@nestjs/common";
import { GetAdminsDto } from "./dto/get-admins.dto"; 
import * as bcrypt from 'bcrypt' 
import { AdminRole } from "../../enums/admin-role.enum";
import { AdminStatus } from "../../enums/admin-status.enum";
import { EmailService } from "src/email/email.service"; 
import { SignInDto } from "../auth/dto/sign-in-admin.dto";
import { JwtPayload } from "../auth/dto/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminRepository extends Repository<Admin> {
    private readonly logger = new Logger(AdminRepository.name);
    constructor( 
        private readonly dataSource: DataSource,
    ) {
        super(Admin, dataSource.createEntityManager());
    }


    
    async getAdminUsers(getAdminUsersDto:GetAdminsDto):Promise<any>{
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