/*
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../../common/entities/company.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEAN, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { SubscriptionType } from "src/api/common/enums/subscription-type.enum";
import { SubscriptionStatus } from "src/api/common/enums/subscription-status.enum";
import { SubscriptionRenewalStatus } from "src/api/common/enums/subscription-renewal-status.enum";
import { Market } from "../../entities/market.entity";

@Entity('subscriptions')
export class Subscription{
    @ApiProperty({required:true})
    @IsString()
    @PrimaryGeneratedColumn()
    id: string

    @ApiProperty({required:true})
    @IsEnum(SubscriptionType)
    @IsNotEmpty()
    @Column({nullable:false})
    type: SubscriptionType

    @ApiProperty({required:true})
    @IsEnum(SubscriptionStatus)
    @IsNotEmpty()
    @Column({nullable:false})
    status: SubscriptionStatus


    @ApiProperty({required:true})
    @IsDate()
    @IsNotEmpty()
    @Column({type: 'timestamp', nullable:false})
    start_date: Date

    @ApiProperty({required:true})
    @IsDate()
    @IsNotEmpty()
    @Column({type: 'timestamp', nullable:false})
    end_date: Date

    @ApiProperty({required:true})
    @IsNumber()
    @IsNotEmpty()
    @Column({nullable:false})
    price: number

    @ApiProperty({required:true})
    @IsNumber()
    @IsNotEmpty()
    @Column({default: 0, nullable:false})
    renewal_count: number

    @ApiProperty({required:false})
    @IsOptional()
    @IsDate()
    @Column({type: 'timestamp'})
    last_renewal_date?: Date

    @ApiProperty({required:false})
    @IsOptional()
    @IsDate()
    @Column({type:'timestamp'})
    next_renewal_date?: Date


    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(SubscriptionRenewalStatus)
    @Column()
    renewal_status: SubscriptionRenewalStatus

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsBoolean()
    @Column()
    automatic_renewal: boolean

    @ApiProperty({required:true})
    @IsNotEmpty()
    @ManyToOne(() => Market, (market) => market.subscriptions) // Subscription (M)  ------  (1) Market
    market: Market

    @ApiProperty({required:true})
    @IsNotEmpty()
    @ManyToOne(() => Company, (company) => company.subscriptions) // Subscription (M) -------- (1) Company
    company: Company
}

*/