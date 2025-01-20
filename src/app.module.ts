import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './api/email/email.module';
import { HealthController } from './app.controller';
import { AdminModule } from './api/admin/admin.module';
import { ClientModule } from './api/client/client.module';
import { ConfigModule } from '@nestjs/config';   
import { MongooseModule } from '@nestjs/mongoose';
import { DataModule } from './api/admin/data/data.module';
import { Token } from './api/entities/token.entity';
import { User } from './api/entities/company-entities/user.entity';
import { Company } from './api/entities/company-entities/company.entity';



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
      entities: [Token, User, Company ],
      autoLoadEntities: true,
      synchronize: true,
      // Connection Pooling
      extra: {
        max: 1000,       // Maximum number of connections in the pool
        min: 2,        // Minimum number of idle connections in the pool
        idleTimeoutMillis: 30000, // How long a connection can be idle before being closed
      },
    }), 
    EmailModule,
    AdminModule,
    ClientModule,
    DataModule, 
  ],
  controllers: [HealthController]
})
export class AppModule {}



