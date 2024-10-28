import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FilterStatesDto{
    @ApiProperty({required:true})
    @IsNotEmpty()
    limit: number

    @ApiProperty({required:true})
    @IsNotEmpty()
    offset: number
}