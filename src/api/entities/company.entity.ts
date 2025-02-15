import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CompanyStatus } from 'src/api/enums/company-status.enum';

@Entity('companies')
export class Company {
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsJSON()
  @Column({ type: 'json', nullable: true })
  address?: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipcode: string;
  };

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  website: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Column({ name: 'phone_number', nullable: true })
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  @Column()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Column({ name: 'logo_url', nullable: true })
  logoUrl?: string;

  @ApiProperty({ required: true, enum: CompanyStatus })
  @IsNotEmpty()
  @IsEnum(CompanyStatus)
  @Column()
  status: CompanyStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @OneToMany(() => User, (user) => user.company)
  users?: User[];

  // Automatically handles 'created at' timestamp
  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  // Automatically handles 'updated at' timestamp, updated whenever entity is modified
  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
