import { Module } from '@nestjs/common';  
import { AuthModule } from './auth/auth.module';  
import { DataModule } from './data/data.module';
import { CompaniesModule } from './companies/companies.module';
import { AdminsModule } from './admins/admins.module';

@Module({
    imports: [ 
        AdminsModule, 
        AuthModule, 
        CompaniesModule, 
        DataModule,  
    ],
    controllers: [],  
    providers: [],  
})
export class AdminModule {}
