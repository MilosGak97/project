import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { TokenType } from "../enums/token-type.enum";

@Entity('tokens')
export class Token{
    @ApiProperty({required:true})
    @PrimaryGeneratedColumn('uuid')
    @IsNotEmpty()
    @IsString()
    id:string

    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    @Column({nullable:false})
    token:string

    @ApiProperty({required:true})
    @IsEnum(TokenType)
    @IsNotEmpty()
    @Column({nullable:false})
    type: TokenType

    @ApiProperty({required:true})
    @IsBoolean()
    @IsNotEmpty()
    @Column()
    expired: boolean

    @ApiProperty({required:true})
    @IsDate()
    @IsNotEmpty()
    expires_at: Date

    @ApiProperty({required:true})
    @IsNotEmpty()
    @ManyToOne(() => User, (user) => user.tokens, {eager:true})
    user: User


    @ApiProperty({required:true})
    @CreateDateColumn()
    created_at: Date

    @ApiProperty({required:false})
    @UpdateDateColumn()
    updated_at: Date
}