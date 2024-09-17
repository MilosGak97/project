import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsOptional, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('admin_users')  // Explicitly name the table
export class AdminUser {
    
    @ApiProperty({
        description: 'Unique identifier of the Admin User',
        example: 'd5b9f1a3-4c9b-4c9a-9250-3a5ecedc4b9f',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Name of the Admin User',
        example: 'John Doe',
        required: false
    })
    @IsOptional()
    @IsString()
    @Column({ nullable: true })
    name?: string;

    @ApiProperty({
        description: 'Email address of the Admin User',
        example: 'johndoe@example.com',
        required: false
    })
    @IsOptional()
    @IsEmail()
    @Column({ nullable: true })
    email?: string;

    @ApiProperty({
        description: 'Password of the Admin User',
        example: 'securePassword123!',
        required: false
    })
    @IsOptional()
    @IsString()
    @Column({ nullable: true })
    password?: string;

    @ApiProperty({
        description: 'Phone number of the Admin User (in international format)',
        example: '+1234567890',
        required: false
    })
    @IsOptional()
    @IsPhoneNumber(null)
    @Column({ nullable: true })
    phone_number?: string;

    @ApiProperty({
        description: 'Role of the Admin User (e.g., admin, manager, user)',
        example: 'admin',
        required: false,
        enum: ['admin', 'manager', 'user']  // Enum for validation
    })
    @IsOptional()
    @IsString()
    @Column({ nullable: true })
    role?: string;

    @ApiProperty({
        description: 'The ID of the admin who created this user',
        example: 'creator_user_id',
        required: false
    })
    @IsOptional()
    @IsString()
    @Column({ nullable: true })
    created_by?: string;

    @ApiProperty({
        description: 'The status of the Admin User (active, suspended, pending)',
        example: 'active',
        required: false,
        enum: ['active', 'suspended', 'pending']  // Enum for statuses
    })
    @IsOptional()
    @IsString()
    @Column({ nullable: true })
    status?: string;
}
