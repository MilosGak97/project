import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './repository/auth.repository';
import { EmailService } from 'src/email/email.service';
import { Admin } from 'src/api/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]),  
    JwtModule.register({secret:  process.env.ADMIN_JWT_SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt'}),] ,
  providers: [AuthService, JwtStrategy, AuthRepository, EmailService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
