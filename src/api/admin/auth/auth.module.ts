import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin} from 'src/entities/admin.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]),  
    JwtModule.register({secret: 'topSecret51'}),
    PassportModule.register({ defaultStrategy: 'jwt'}),] ,
  providers: [AuthService, JwtStrategy, AuthRepository, EmailService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}