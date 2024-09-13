import { Module } from '@nestjs/common';
import { AdminUsersController } from './admin_users.controller';
import { AdminUsersService } from './admin_users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './admin_user.entity';
import { AdminUserRepository } from './admin_users_repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [
    AdminUsersService, AdminUserRepository
  ],
  controllers: [AdminUsersController], 
})
export class AdminUsersModule {}