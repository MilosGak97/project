import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, IsOptional, IsString, IsPhoneNumber, IsEnum, IsBoolean, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminStatus } from "../enums/admin-status.enum";
import { AdminRole } from "../enums/admin-role.enum";

@Entity('admins')  // Explicitly name the table
export class Admin {

    @ApiProperty({
        description: 'Unique identifier of the Admin User',
        example: 'd5b9f1a3-4c9b-4c9a-9250-3a5ecedc4b9f',
        required: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @Column()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsEmail()
    @Column()
    email: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsBoolean()
    @Column({ default: false })  // Default value for email_verified
    email_verified: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Column()
    password: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsPhoneNumber(null)
    @Column({ nullable: true })
    phone_number?: string;

    @ApiProperty({
        description: 'The ENUM Role of the Admin User',
        enum: AdminRole,
        required: true,
    })
    @IsNotEmpty()
    @IsEnum(AdminRole)
    @Column()
    role: AdminRole;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @Column()
    created_by: string;

    @ApiProperty({
        description: 'The ENUM status of the Admin User ',
        enum: AdminStatus,
        required: true,
    })
    @IsNotEmpty()
    @IsEnum(AdminStatus)
    @Column()
    status: AdminStatus;


    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    @Column({ nullable: true })
    refreshToken: string



    @ApiProperty({required:true})
    @IsBoolean()
    @Column()
    initial_password: boolean


    @ApiProperty({required:true})
    @IsDate()
    @Column()
    status_changed_at: Date

    // Automatically handles 'created at' timestamp
    @CreateDateColumn()
    created_at: Date;
    
    // Automatically handles 'updated at' timestamp, updated whenever entity is modified
    @UpdateDateColumn()
    updated_at: Date;

} 
 