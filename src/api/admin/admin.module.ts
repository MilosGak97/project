import { Module } from '@nestjs/common'; 
import { AdminManagementModule } from './admin-management/admin-management.module'; 
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';

@Module({
    imports: [ 
        AdminManagementModule, AuthModule,
    ] ,
    controllers: [], // Leave empty if you don't want to define any controllers at this level
    providers: [], // Any providers related to the Admin module can go here
})
export class AdminModule {}
