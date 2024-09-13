import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AdminUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ nullable: true })
    phone_number?: string;

    @Column({ nullable: true })
    role?: string;

    @Column({ nullable: true })
    created_by?: string;

    @Column({ nullable: true })
    status?: string;
}
