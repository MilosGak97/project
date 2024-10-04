import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './email/email.module';
import { HealthController } from './app.controller';
import { AdminModule } from './api/admin/admin.module';
import { ClientModule } from './api/client/client.module';
import { ConfigModule } from '@nestjs/config';  
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [  
     ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration accessible globally
    }),
    MongooseModule.forRoot('mongodb+srv://milo:TheDVTN2020!@cluster0.5gbca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
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
    ClientModule,
     ],
    
controllers: [HealthController]
})
export class AppModule {}
