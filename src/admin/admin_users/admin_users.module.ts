import { Module } from '@nestjs/common';
import { AdminUsersController } from './admin_users.controller';
import { AdminUsersService } from './admin_users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './admin_user.entity';
import { AdminUserRepository } from './admin_users_repository';
import { EmailService } from 'src/email/email.service';
import { PassportModule } from '@nestjs/passport';  
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [  
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    TypeOrmModule.forFeature([AdminUser])],
  providers: [
    AdminUsersService, AdminUserRepository, EmailService, JwtStrategy
  ],
  controllers: [AdminUsersController], 
  exports: [JwtStrategy, PassportModule],
})
export class AdminUsersModule {}