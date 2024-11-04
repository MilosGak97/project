import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Admin } from "src/api/entities/admin.entity";
import { FilteredStatus } from "src/api/enums/filtered-status.enum";
import { Filtering } from "src/api/schemas/filtering-logs.schema";
import { ListLogsDto } from "../../admin/data/properties/on-market/dto/list-logs.dto";

@Injectable()
export class FilteringRepository{
    constructor(
        @InjectModel(Filtering.name) private filteringModel: Model<Filtering>
    ){}
 
    //active
    async createFilteringLog(propertyId: string, admin: Admin, action: FilteredStatus): Promise<{
        message: string
    }> {
        const adminId:string  = admin.id  

        console.log("Admin ID: " + adminId)
        console.log("Property ID: " + propertyId)
        console.log("Action: " + action)
        const filtering = new this.filteringModel({ adminId, propertyId, action });
        filtering.save()
        return {message: "Filtering log is succesfully created."}
      }
      
      //active
      async listLogs(listLogsDto: ListLogsDto): Promise<Filtering[]> {
        const {limit, offset } = listLogsDto
        
        console.log(`Fetching logs with limit: ${limit}, offset: ${offset}`);

        try {
            return await this.filteringModel
                .find()
                .limit(limit)
                .skip(offset)
                .exec();
        } catch (error) {
            console.error('Error fetching logs:', error);
            throw new InternalServerErrorException('Could not fetch logs');
        }
      }
}