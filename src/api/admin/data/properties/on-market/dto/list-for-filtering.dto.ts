import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { BrightdataSnapshot } from "src/api/entities/brightdata-snapshot.entity"; 

export class ListForFilteringDto{
    //@ApiProperty()
    //@IsOptional()
   // market?: Market

    @ApiProperty()
    @IsOptional()
    snapshot?: BrightdataSnapshot

}