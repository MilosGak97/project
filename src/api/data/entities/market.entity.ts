import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"; 
import { MarketTier } from "src/api/common/enums/market-tier.enum";
import { County } from "./county.entity";
//import { Subscription } from "../property-listings/entities/subscription.entity";

@Entity('markets')
export class Market{
    @ApiProperty({required:true})
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({required:false})
    @IsEnum(MarketTier)
    @IsOptional()
    tier: MarketTier
    
    /*
    @ApiProperty({required: false})
    @OneToMany(() => Subscription, (subscription) => subscription.market) // Market (1) ----- (M) Subscription
    subscriptions: Market[]
*/

    @ApiProperty({required: true})
    @OneToMany(()=> County, (county) => county.market)  //  Market (1)  -----------  (M) County
    counties: County[]
}