import { Module } from '@nestjs/common';
import { AdminUsersModule } from './admin/admin_users/admin_users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './email/email.module';
import { HealthController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-1.ch6caoe88tbd.eu-north-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'Jebemnevadim1.',
      database: 'newdb', 
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true,
    }),
    AdminUsersModule,
    EmailModule,],
    
controllers: [HealthController]
})
export class AppModule {}
