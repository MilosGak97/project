import { Module } from '@nestjs/common'; 
import { AdminManagementModule } from './admin-management/admin-management.module'; 
import { AuthModule } from './auth/auth.module'; 
import { ClientManagementModule } from './client-management/client-management.module'; 
import { ZillowScrapperModule } from './zillow-scrapper/zillow-scrapper.module';
import { DataModule } from './data/data.module';
import { FilteringFeatureModule } from './filtering-feature/filtering-feature.module';

@Module({
    imports: [ 
        AdminManagementModule, 
        AuthModule, 
        ClientManagementModule,
        ZillowScrapperModule, 
        DataModule, FilteringFeatureModule
    ],
    controllers: [],  
    providers: [],  
})
export class AdminModule {}
