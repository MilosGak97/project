import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('realtor-agents')
export class RealtorAgent{
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string




        // Automatically handles 'created at' timestamp
        @ApiProperty()
        @CreateDateColumn()
        created_at: Date;
        
        // Automatically handles 'updated at' timestamp, updated whenever entity is modified
        @ApiProperty()
        @UpdateDateColumn()
        updated_at: Date;
}