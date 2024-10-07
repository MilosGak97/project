import { DataSource, Repository } from "typeorm";
import { ScrapperFunction } from "../../entities/scrapper-function.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ScrapperFunctionRepository extends Repository<ScrapperFunction> {
    constructor(
        private readonly dataSource: DataSource
    ){
        super(ScrapperFunction, dataSource.createEntityManager())
    }
 
    


}