import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    JwtModule.register({secret: process.env.CLIENT_JWT_SECRET}),
    PassportModule.register({defaultStrategy: 'jwt'}),
    
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository]
})
export class AuthModule {}
