import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity('subscriptions')
export class Subscription{
    @PrimaryGeneratedColumn()
    id: string

    





    @ManyToOne(() => Company, (company) => company.subscriptions)
    company: Company
}