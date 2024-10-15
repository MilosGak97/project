import { Module } from '@nestjs/common';
import { AdminManagementController } from './admin-management.controller';
import { AdminManagementService } from './admin-management.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AdminManagementRepository } from 'src/api/repositories/postgres/admin-management.repository';
import { PassportModule } from '@nestjs/passport'; 
import { EmailService } from 'src/email/email.service'; 
import { JwtModule } from '@nestjs/jwt';
import { Admin } from 'src/api/entities/admin.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({secret: 'topSecret51' }), 
    PassportModule.register({ defaultStrategy: 'jwt'}),],
  providers: [
    AdminManagementService, AdminManagementRepository,  EmailService,
  ],
  controllers: [AdminManagementController], 
})
export class AdminManagementModule {}