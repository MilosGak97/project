import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsJSON, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator"; 
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity"; 
import { Subscription } from "./subscription.entity";
import { CompanyStatus } from "src/enums/company-status.enum";

@Entity('companies')
export class Company{
    @ApiProperty({required:true})
    @PrimaryGeneratedColumn('uuid')
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({required:true})
    @Column({nullable:false})
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({required: false})
    @IsOptional()
    @IsJSON()
    @Column({ type: 'json' })  
    address?: {
        address1: string;
        address2?: string;
        city: string;
        state: string;
        zipcode: string;
    };
    
    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    @Column({nullable:false})
    website: string

    @ApiProperty({required: false })
    @IsOptional()
    @IsPhoneNumber('US')
    @Column()
    phone_number?: string

    @ApiProperty({required:false})
    @IsOptional()
    @IsEmail()
    @Column()
    email: string

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    @Column()
    logo_url?: string

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsEnum(CompanyStatus)
    @Column()
    status: CompanyStatus

    @ApiProperty({required:false})
    @IsOptional()
    @OneToMany(() => Subscription, (subscription) => subscription.company)
    subscriptions?: Subscription[]

    @ApiProperty({required: false})
    @IsOptional()
    @OneToMany(() => User, (user) => user.company)
    users?: User[]

}