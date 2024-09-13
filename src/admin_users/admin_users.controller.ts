import { Body, Controller, Post, Get } from '@nestjs/common';
import { AdminUsersService } from './admin_users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { AdminUser } from './admin_user.entity';

@Controller('admin-users')
export class AdminUsersController {
    constructor(private adminUsersService: AdminUsersService){}

    @Post()
    createAdminUser(@Body() createAdminUserDto: CreateAdminUserDto):Promise<AdminUser>{
        return this.adminUsersService.createAdminUser(createAdminUserDto)
    }


    @Get()
    getAllAdminUsers():Promise<AdminUser[]>{
        return this.adminUsersService.getAllAdminUsers()
    }
}
 