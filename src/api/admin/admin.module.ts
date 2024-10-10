import { Module } from '@nestjs/common'; 
import { AdminManagementModule } from './admin-management/admin-management.module'; 
import { AuthModule } from './auth/auth.module'; 
import { ClientManagementModule } from './client-management/client-management.module'; 
import { ZillowScrapperModule } from './zillow-scrapper/zillow-scrapper.module';

@Module({
    imports: [ 
        AdminManagementModule, 
        AuthModule, 
        ClientManagementModule,
        ZillowScrapperModule, 
    ],
    controllers: [],  
    providers: [],  
})
export class AdminModule {}
