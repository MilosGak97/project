import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./company.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator"; 
import { UserRole } from "src/api/enums/user-role.enum";
import { UserStatus } from "src/api/enums/user-status.enum";
import { UserType } from "../enums/user-type.enum";
import { Token } from "./token.entity";

@Entity('users')
export class User{
    
    @ApiProperty({required:true})
    @PrimaryGeneratedColumn('uuid')
    id:string


    @IsString()
    @IsOptional()
    @Column({nullable:true})
    name?: string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsEmail()
    @Column({nullable:false})
    email: string

    @ApiProperty({required:false})
    @IsPhoneNumber('US')
    @IsOptional()
    @Column({nullable:true})
    phone_number?: string

    @ApiProperty({required:false})
    @IsStrongPassword()
    @IsString()
    @IsOptional()
    @Column({nullable:true})
    password?: string

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


    @ApiProperty({required:true})
    @IsEnum(UserType)
    @IsNotEmpty()
    @Column({nullable:true})
    user_type?: UserType.USER

    @ApiProperty({required:false})
    @IsDate()
    @IsOptional()
    @Column({nullable:true})
    status_updated_at: Date

    @ApiProperty({required:false}) 
    @IsOptional()
    @OneToMany(() => Token, (token) => token.user)
    tokens: Token[]

    // Automatically handles 'created at' timestamp
    @ApiProperty()
    @CreateDateColumn()
    created_at: Date;
    
    // Automatically handles 'updated at' timestamp, updated whenever entity is modified
    @ApiProperty()
    @UpdateDateColumn()
    updated_at: Date;

    @ApiProperty({required: false})
    @IsOptional()
    @ManyToOne(() => Company, (company) => company.users)
    company?: Company
}