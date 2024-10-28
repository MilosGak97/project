import { DataSource, Repository } from "typeorm"; 
import { Injectable } from "@nestjs/common"; 
import { ScrapperSnapshotStatus } from "src/api/enums/scrapper-snapshot-status.enum";
import { ListSnapshotsDto } from "src/api/admin/data/properties/on-market/dto/list-snapshots.dto"; 
import { BrightdataSnapshot } from "src/api/entities/brightdata-snapshot.entity";

@Injectable()
export class BrightdataSnapshotRepository extends Repository<BrightdataSnapshot>{
    constructor(
        private readonly dataSource: DataSource
    ){
        super(BrightdataSnapshot, dataSource.createEntityManager())
    }
    
    //active
    async logSnapshot(snapshot_id, state_id):Promise<{
        message:string
    }>{
        const snapshot_log = new BrightdataSnapshot()
        snapshot_log.brightdata_id = snapshot_id
       // snapshot_log.state = state_id
        snapshot_log.status = ScrapperSnapshotStatus.IN_PROGRESS

        await this.save(snapshot_log)
        return {
            message: "Snapshot is saved successfully"
        }
    }

    //active
    async listSnapshots(listSnapshotsDto: ListSnapshotsDto):Promise<{
        result: BrightdataSnapshot[],
        totalRecords: number,
        totalPages: number,
        currentPage: number,
        limit: number,
        offset: number
    }>{
        const { searchQuery, created_at, status, limit, offset } = listSnapshotsDto
        const query = await this.createQueryBuilder('snapshot')
        .leftJoinAndSelect('snapshot.market', 'market')
        if(searchQuery){
            query.andWhere('(snapshot.brightdata_id LIKE :searchQuery OR snapshot.marketId LIKE :searchQuery)', {searchQuery: `%${searchQuery}%`})
        }
        if(created_at){
            query.andWhere('(snapshot.created_at::date = :created_at)', {created_at})
        }
        if(status){
            query.andWhere('(snapshot.status = :status)', {status})
        }
        query.take(limit)
        query.skip(offset)
        const [result, totalRecords ] = await query.getManyAndCount() 
        const totalPages = Math.ceil(totalRecords/limit)
        const currentPage = Math.floor(offset/limit) + 1

        return {
            result,
            totalRecords,
            totalPages,
            currentPage,
            limit,
            offset

        }
    }
 
}