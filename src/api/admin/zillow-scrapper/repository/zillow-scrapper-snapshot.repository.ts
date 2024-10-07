import { DataSource, Repository } from "typeorm"; 
import { Injectable } from "@nestjs/common";
import { ZillowScrapperSnapshot } from "../../../entities/zillow-scrapper-snapshot.entity";
import { ScrapperSnapshotStatus } from "../../../enums/scrapper-snapshot-status.enum";

@Injectable()
export class ZillowScrapperSnapshotRepository extends Repository<ZillowScrapperSnapshot>{
    constructor(
        private readonly dataSource: DataSource
    ){
        super(ZillowScrapperSnapshot, dataSource.createEntityManager())
    }
    
    async logSnapshot(snapshot_id, market_id):Promise<{
        message:string
    }>{
        const snapshot_log = new ZillowScrapperSnapshot()
        snapshot_log.brightdata_id = snapshot_id
        snapshot_log.market = market_id
        snapshot_log.status = ScrapperSnapshotStatus.IN_PROGRESS

        await this.save(snapshot_log)
        return {
            message: "Snapshot is saved successfully"
        }
    }


}