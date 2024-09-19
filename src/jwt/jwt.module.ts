import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    NestJwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
