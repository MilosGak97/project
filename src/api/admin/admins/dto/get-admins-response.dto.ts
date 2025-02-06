import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { GetAdminsTypeDto } from './get-admins-type.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';


@ApiExtraModels(GetAdminsTypeDto) // Register the nested DTO
export class GetAdminsResponseDto {
    @ApiProperty({ type: [GetAdminsTypeDto] }) // Reference the nested DTO
    result: GetAdminsTypeDto[];

    @ApiProperty()
    @IsNumber()
    @Type((): NumberConstructor=> Number)
    totalRecords: number;

    @ApiProperty()
    @IsNumber()
    @Type((): NumberConstructor=> Number)
    currentPage: number;

    @ApiProperty()
    @IsNumber()
    @Type((): NumberConstructor=> Number)
    totalPages: number;

    @ApiProperty()
    @IsNumber()
    @Type((): NumberConstructor=> Number)
    limit: number;

    @ApiProperty()
    @IsNumber()
    @Type((): NumberConstructor=> Number)
    offset: number;
}
