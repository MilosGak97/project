import { DataSource, Repository } from "typeorm";
import { ScrapperTask } from "../../entities/scrapper-task.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ScrapperTaskRepository extends Repository<ScrapperTask>{
    constructor(
        private readonly dataSource: DataSource
    ){
        super(ScrapperTask, dataSource.createEntityManager())
    }
    

    

}