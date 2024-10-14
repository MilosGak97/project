import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Admin } from "src/api/entities/admin.entity";
import { FilteredStatus } from "src/api/enums/filtered-status.enum";
import { Filtering } from "src/api/schemas/filtering-logs.schema";

@Injectable()
export class FilteringRepository{
    constructor(
        @InjectModel(Filtering.name) private filteringModel: Model<Filtering>
    ){}


    
    async createFilteringLog(propertyId: string, admin: Admin, action: FilteredStatus): Promise<{
        message: string
    }> {
        const adminId:string  = admin.id  
        const filtering = new this.filteringModel({ adminId, propertyId, action });
        return {message: "Filtering log is succesfully created."}
      }
      
      async listAll(): Promise<Filtering[]> {
        return this.filteringModel.find().exec();
      }
    
}