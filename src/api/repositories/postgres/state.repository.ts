import { Injectable } from "@nestjs/common";
import { State } from "src/api/entities/state.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class StateRepository extends Repository<State>{
    constructor(
        private readonly dataSource: DataSource
    ){super( State, dataSource.createEntityManager())}

    async statesDaily():Promise<State[]>{
        const response = await this.find({where: {daily_scrapping: true}})  
        return response
    }


}