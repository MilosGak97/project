import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./company.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator"; 
import { UserRole } from "src/enums/user-role.enum";
import { UserStatus } from "src/enums/user-status.enum";

@Entity('users')
export class User{
    
    @ApiProperty({required:true})
    @PrimaryGeneratedColumn('uuid')
    id:string
    @IsString()
    @IsNotEmpty()
    @Column({nullable:false})
    name: string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsEmail()
    @Column({nullable:false})
    email: string

    @ApiProperty({required:false})
    @IsPhoneNumber('US')
    @IsOptional()
    @Column()
    phone_number?: string

    @ApiProperty({required:true})
    @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    @Column({nullable:false})
    password: string

    @ApiProperty({required:true})
    @IsBoolean()
    @IsNotEmpty()
    @Column({nullable:false})
    initial_password: boolean

    @ApiProperty({required: true})
    @IsBoolean()
    @IsNotEmpty()
    @Column({nullable:false})
    email_verified: boolean

    @ApiProperty({required: true})
    @IsEnum(UserRole)
    @IsNotEmpty()
    @Column({nullable:false})
    role: UserRole

    @ApiProperty({required:true})
    @IsEnum(UserStatus)
    @IsNotEmpty()
    @Column({nullable:false})
    status: UserStatus

    @ApiProperty({required:false})
    @IsDate()
    @IsOptional()
    @Column()
    status_updated_at: Date

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @Column()
    refreshToken: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => Company, (company) => company.users)
    company: Company
}