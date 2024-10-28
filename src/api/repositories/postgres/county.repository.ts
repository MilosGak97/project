import { Injectable } from "@nestjs/common"
import { County } from "src/api/entities/county.entity"
import { DataSource, Repository } from "typeorm"  

@Injectable()
export class CountyRepository extends Repository<County>{
    constructor(
         private readonly dataSource: DataSource, 
    ){
        super(County, dataSource.createEntityManager())
    }

    /*
// new method
async createCounty(marketId:string, createCountyDto: CreateCountyDto):Promise<{
    message: string
}>{
    const market = await this.marketRepository.findOne({where: {id: marketId}})
    if(!market){
        throw new NotFoundException("Market with provided ID does not exist.")
    }
    const {name, zillow_url_new, zillow_url_sold, state, zipcodes } = createCountyDto

    if(!name){
        throw new ConflictException("Name field is empty, but mandatory.")
    }
    if(!state){
        throw new ConflictException("State field is empty, but mandatory.")
    }
    const county = new County()
    county.name = name
    county.state = state
    county.status = CountyStatus.ACTIVE
    
    if(zillow_url_new){
        county.zillow_url_new = zillow_url_new
    }

    if(zillow_url_sold){
        county.zillow_url_sold = zillow_url_sold
    }
    
    if(zipcodes){
        county.zipcodes= zipcodes
    }

    county.market = market

    await this.save(county)

    return {message: "County is successfully created."}
}
// new method
async updateCounty(marketId:string, countyId: string, updateCountyDto:UpdateCountyDto):Promise<{
    message:string
}>{
    
    const county = await this.findOne({where: {id: countyId, market: {id: marketId}}})
    if(!county){
        throw new NotFoundException("County with this ID does not exist.")
    }
    const {name, status, state, zillow_url_new, zillow_url_sold, zipcodes} = updateCountyDto
    if(name){
        county.name = name
    }
    if(status){
        county.status = status
    }
    if(state){
        county.state = state
    }
    if(zillow_url_new){
        county.zillow_url_new = zillow_url_new
    }
    if(zillow_url_sold){
        county.zillow_url_sold = zillow_url_sold
    }
    if(zipcodes){
        county.zipcodes = zipcodes
    }

    await this.save(county)
    return {
        message: "County is successfully updated."
    }

}
// new method
async deleteCounty(marketId:string, countyId: string):Promise<{
    message:string
}>{
    const county = await this.findOne({where: {market: {id: marketId}, id: countyId}})
    if(!county){
        throw new NotFoundException("Couldnt find county based on Market ID and County ID.")
    }
    county.status = CountyStatus.DELETED
    await this.save(county)
    return {
        message:"County is successfully deleted."
    }
}
// new method
async listCounties(marketId: string, listCountiesDto: ListCountiesDto):Promise<{
    counties: County[]
}>{
     
    const counties = await this.find({where: {market: {id: marketId}}})
    if(!counties){
        throw new NotFoundException("There is no counties withing provided Market ID.")
    }
    return {counties}

}

async getCounty(marketId: string, countyId:string ):Promise<County>{
    const county = await this.findOne({where: { id: countyId, market: {id: marketId}}})
    if(!county){
        throw new NotFoundException("Could not find County with provided ID and Market ID")
    }
    return county
}
    */


}