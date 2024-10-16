import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { MarketStatus } from "src/api/enums/market-status";

export class ListMarketsDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    searchQuery?: string;  

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => value === 'true')  
    @IsBoolean()
    daily_scrapping?: boolean;  

    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(MarketStatus)
    status?: MarketStatus

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    limit: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    offset: number;
}
