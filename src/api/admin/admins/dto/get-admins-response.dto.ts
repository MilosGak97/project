import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { GetAdminsTypeDto } from './get-admins-type.dto';


@ApiExtraModels(GetAdminsTypeDto) // Register the nested DTO
export class GetAdminsResponseDto {
    @ApiProperty({ type: [GetAdminsTypeDto] }) // Reference the nested DTO
    result: GetAdminsTypeDto[];

    @ApiProperty()
    totalRecords: number;

    @ApiProperty()
    currentPage: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    limitNumber: number;

    @ApiProperty()
    offsetNumber: number;
}
