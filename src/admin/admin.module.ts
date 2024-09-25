import { Module } from '@nestjs/common'; 
import { AdminsModule } from './admins/admins.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [AdminsModule, AuthModule] ,
    controllers: [], // Leave empty if you don't want to define any controllers at this level
    providers: [], // Any providers related to the Admin module can go here
})
export class AdminModule {}
