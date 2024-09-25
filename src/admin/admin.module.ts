import { Module } from '@nestjs/common';
import { AdminUsersModule } from './admin_users/admin_users.module';

@Module({
    imports: [AdminUsersModule],
    controllers: [], // Leave empty if you don't want to define any controllers at this level
    providers: [], // Any providers related to the Admin module can go here
})
export class AdminModule {}
