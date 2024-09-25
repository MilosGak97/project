import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './email/email.module';
import { HealthController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';

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
    EmailModule,
    AdminModule,
    ClientModule,],
    
controllers: [HealthController]
})
export class AppModule {}
