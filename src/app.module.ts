import { Module } from '@nestjs/common';
import { AdminUsersModule } from './admin_users/admin_users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    AdminUsersModule],
})
export class AppModule {}
