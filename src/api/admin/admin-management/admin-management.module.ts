import { Module } from '@nestjs/common';
import { AdminManagementController } from './admin-management.controller';
import { AdminManagementService } from './admin-management.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../../../entities/admin.entity';
import { AdminManagementRepository } from './admin-management.repository';
import { PassportModule } from '@nestjs/passport'; 
import { EmailService } from 'src/email/email.service'; 
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600
      }
    }), 
    PassportModule.register({ defaultStrategy: 'jwt'}),],
  providers: [
    AdminManagementService, AdminManagementRepository,  EmailService,
  ],
  controllers: [AdminManagementController], 
})
export class AdminManagementModule {}