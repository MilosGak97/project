import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { Market } from "src/api/entities/market.entity";
import { ZillowScrapperSnapshot } from "src/api/entities/zillow-scrapper-snapshot.entity";

export class ListForFilteringDto{
    @ApiProperty()
    @IsOptional()
    market?: Market

    @ApiProperty()
    @IsOptional()
    snapshot?: ZillowScrapperSnapshot

}