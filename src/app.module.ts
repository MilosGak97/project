import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './email/email.module';
import { HealthController } from './app.controller';
import { AdminModule } from './api/admin/admin.module';
import { ClientModule } from './api/client/client.module';
import { ConfigModule } from '@nestjs/config';   
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [  
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration accessible globally
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB, 
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true,
    }), 
    EmailModule,
    AdminModule,
    ClientModule,
  ],
  controllers: [HealthController]
})
export class AppModule {}



