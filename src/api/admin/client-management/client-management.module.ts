import { Module } from '@nestjs/common';
import { ClientManagementController } from './client-management.controller';
import { ClientManagementService } from './client-management.service';
import { CompanyRepository } from './repository/company.repository';
import { UserRepository } from './repository/users.repository';  
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/api/common/entities/user.entity';
import { Company } from 'src/api/common/entities/company.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; 
//import { Subscription } from 'src/api/data/property-listings/entities/subscription.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports:
  [
    TypeOrmModule.forFeature([User, Company]),
    JwtModule.register({secret: 'topSecret51'}),
    PassportModule.register({defaultStrategy: 'jwt'})
  ] ,
  controllers: [ClientManagementController],
  providers: [ClientManagementService, CompanyRepository, UserRepository, EmailService]
})
export class ClientManagementModule {}
