import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePropertyListingDto } from "src/api/admin/data/properties/on-market/dto/create-property-listing.dto";
import { PropertyListing } from "src/api/entities/property-listing.entity";
import { ListingsLA } from "src/api/schemas/listingsLA.schema";

@Injectable()
export class ListingsLARepository{
    constructor(
        @InjectModel(ListingsLA.name) private listingsLAModel: Model<ListingsLA> 
    ){}

    async createProperty(createPropertyListingDto: CreatePropertyListingDto): Promise<{ message: string }> {
        const {
          zpid,
          home_status,
          streetAddress,
          city,
          zipcode,
          state,
          bedrooms,
          bathrooms,
          price,
          longitude,
          latitude,
          livingArea,
          livingAreaUnitsShort,
          homeType,
          parcelId,
          hdpTypeDimension,
          photoCount,
          photos,
          county,
          additionalInfo,
          snapshot,
          lpb_name,
          lpb_company,
          lpb_email,
          lpb_phone_number,
          isNonOwnerOccupied
        } = createPropertyListingDto;
    
        // Check if property with the same zpid already exists
        const zpidExist = await this.listingsLAModel.findOne({ zpid });
        if (zpidExist) {
            console.log("ZPID: " + zpid)
            
            console.log("ZPID Exist Status: " + zpidExist.current_status)
            console.log("ZPID Exist Status Date: " + zpidExist.current_status_date)
          throw new ConflictException("Property with this ZPID already exists");
        }
        
        const initial_scrapping = true

        // Create a new instance of PropertyListing document
        const property = new this.listingsLAModel({
          zpid,
          homeStatus: home_status,
          streetAddress,
          city,
          zipcode,
          state,
          bedrooms,
          bathrooms,
          price,
          longitude,
          latitude,
          livingArea,
          livingAreaUnitsShort,
          homeType,
          parcelId,
          hdpTypeDimension,
          photoCount,
          photos,
          county,
          filtered_status: null,  // or assign default value if needed
          listing_provided_by__name: lpb_name,
          listing_provided_by__company: lpb_company,
          listing_provided_by_email: lpb_email,
          llisting_provided_by_phone_number: lpb_phone_number,
          isNonOwnerOccupied,
          additionalInfo, // If additionalInfo is provided
          initial_scrapping,
          verified: null
        });
    
        // Save the document in MongoDB
        const savedProperty = await property.save();
    
        return { message: "Property created successfully"  };
      }

}