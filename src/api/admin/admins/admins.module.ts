import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AdminRepository } from 'src/api/repositories/postgres/admin.repository';
import { PassportModule } from '@nestjs/passport'; 
import { EmailService } from 'src/api/email/email.service'; 
import { JwtModule } from '@nestjs/jwt';
import { Admin } from 'src/api/entities/admin-entities/admin.entity';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({secret: process.env.ADMIN_JWT_SECRET  }), 
    PassportModule.register({ defaultStrategy: 'jwt'}),],
  providers: [
    AdminsService, AdminRepository,  EmailService,
  ],
  controllers: [AdminsController], 
})
export class AdminsModule {}