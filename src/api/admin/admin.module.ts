import { Module } from '@nestjs/common'; 
import { AdminManagementModule } from './admin-management/admin-management.module'; 
import { AuthModule } from './auth/auth.module'; 
import { ClientManagementModule } from './client-management/client-management.module';

@Module({
    imports: [ 
        AdminManagementModule, AuthModule, ClientManagementModule,
    ] ,
    controllers: [],  
    providers: [],  
})
export class AdminModule {}
