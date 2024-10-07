import { Module } from '@nestjs/common'; 
import { AdminManagementModule } from './admin-management/admin-management.module'; 
import { AuthModule } from './auth/auth.module'; 
import { ClientManagementModule } from './client-management/client-management.module';
import { ScrapperModule } from './zillow-scrapper/zillow-scrapper.module';
import { MarketManagementModule } from './market-management/market-management.module';

@Module({
    imports: [ 
        AdminManagementModule, 
        AuthModule, 
        ClientManagementModule,
        ScrapperModule,
        MarketManagementModule,
    ],
    controllers: [],  
    providers: [],  
})
export class AdminModule {}
