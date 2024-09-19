import { Module } from '@nestjs/common';
import { AdminUsersController } from './admin_users.controller';
import { AdminUsersService } from './admin_users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './admin_user.entity';
import { AdminUserRepository } from './admin_users_repository';
import { EmailService } from 'src/email/email.service';
import { PassportModule } from '@nestjs/passport'; 
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [ 
    JwtModule,
    PassportModule.register({ defaultStrategy: 'jwt'}),
    TypeOrmModule.forFeature([AdminUser])],
  providers: [
    AdminUsersService, AdminUserRepository, EmailService
  ],
  controllers: [AdminUsersController], 
})
export class AdminUsersModule {}