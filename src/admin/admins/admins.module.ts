import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../../entities/admin.entity';
import { AdminRepository } from './admins.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    TypeOrmModule.forFeature([Admin]),
  
    PassportModule.register({ defaultStrategy: 'jwt'}),],
  providers: [
    AdminsService, AdminRepository
  ],
  controllers: [AdminsController], 
})
export class AdminsModule {}