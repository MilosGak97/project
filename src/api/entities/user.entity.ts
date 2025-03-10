import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserRole } from 'src/api/enums/user-role.enum';
import { UserStatus } from 'src/api/enums/user-status.enum';
import { UserType } from '../enums/user-type.enum';
import { Token } from './token.entity';

@Entity('users')
export class User {
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  name?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  @Column({ nullable: false })
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Column({ name: 'phone_country_code', nullable: true })
  phoneCountryCode: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Column({ name: 'phone_number_prefix', nullable: true })
  phoneNumberPrefix?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Column({ name: 'phone_number', nullable: true })
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsStrongPassword()
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  password?: string;

  @ApiProperty({ required: false })
  @IsStrongPassword()
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  passcode?: string;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  @Column({ name: 'email_verified', nullable: false })
  emailVerified: boolean;

  @ApiProperty({ required: true })
  @IsEnum(UserRole)
  @IsNotEmpty()
  @Column({ nullable: false })
  role: UserRole;

  @ApiProperty({ required: true })
  @IsEnum(UserStatus)
  @IsNotEmpty()
  @Column({ nullable: false })
  status: UserStatus;

  @ApiProperty({ required: true })
  @IsEnum(UserType)
  @IsNotEmpty()
  @Column({ name: 'user_type', nullable: true })
  userType?: UserType.USER;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Column({ name: 'status_updated_at', nullable: true })
  statusUpdatedAt: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  // Automatically handles 'created at' timestamp
  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  // Automatically handles 'updated at' timestamp, updated whenever entity is modified
  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'company_id' }) // Explicitly define the foreign key column
  company?: Company;
}
