import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthRepository } from './auth.repository';
import { TokenRepository } from 'src/api/repositories/postgres/token.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/api/entities/user.entity';
import { Token } from 'src/api/entities/token.entity';
import { EmailService } from 'src/api/email/email.service';
import { JwtUserStrategy } from './jwtUser.strategy';

@Module({
  imports: [
    JwtModule.register({secret: process.env.CLIENT_JWT_SECRET}),
    PassportModule.register({defaultStrategy: 'jwt'}),
    TypeOrmModule.forFeature([User, Token])
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    AuthRepository,
    TokenRepository,
    EmailService,
    JwtUserStrategy,
  ],
  
exports: [JwtUserStrategy, PassportModule],
})
export class AuthModule {} 