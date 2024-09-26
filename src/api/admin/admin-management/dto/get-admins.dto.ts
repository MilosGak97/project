import { ApiProperty, ApiRequestTimeoutResponse } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AdminRole } from "../../../../enums/admin-role.enum";
import { Type } from "class-transformer";
import { AdminStatus } from "../../../../enums/admin-status.enum";

export class GetAdminsDto{

@ApiProperty({ 
    description: "This field could contain Name, Phone Number or Email of admin user",
    required: false,
    examples: {
        nameExample: { summary: 'Name Example', value: 'John Doe' },
        emailExample: { summary: 'Email Example', value: 'johndoe@example.com' },
        phoneExample: { summary: 'Phone Number Example', value: '+1234567890' },
      },
})
@IsOptional()
@IsString()
searchQuery?: string

 
@ApiProperty({
    description: 'Enum for admin role',
    enum: AdminRole,
    required: false
})
@IsOptional()
@IsEnum(AdminRole)
role?: AdminRole

@ApiProperty({
    description: 'Enum for admin status',
    enum: AdminStatus,
    required:false
})
@IsOptional()
@IsEnum(AdminStatus)
status?: AdminStatus

@ApiProperty({required: true})
@IsNotEmpty()
@Type(() => Number) // Ensures the value is converted to a number
limit: number

@ApiProperty({required:true})
@IsNotEmpty()
@Type(() => Number)
offset: number


}