import { DataSource, Repository } from "typeorm";
import { ScrapperSnapshot } from "../../entities/scrapper-snapshot.entity";

export class ScrapperSnapshotRepository extends Repository<ScrapperSnapshot>{
    constructor(
        private readonly dataSource: DataSource
    ){
        super(ScrapperSnapshot, dataSource.createEntityManager())
    }
    
}