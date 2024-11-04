import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { FilteredStatus } from "src/api/enums/filtered-status.enum";

export class FilterActionDto{
    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    propertyId: string

    @ApiProperty({required:true})
    @IsEnum(FilteredStatus)
    @IsNotEmpty()
    action: FilteredStatus
}