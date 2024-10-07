import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { MarketStatus } from "src/api/enums/market-status";

export class UpdateMarketDto{
    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({required:false})
    @IsEnum(MarketStatus)
    @IsOptional()
    status: MarketStatus

    @ApiProperty({required:false})
    @IsBoolean()
    @IsOptional()
    daily_scrapping: boolean

    

}