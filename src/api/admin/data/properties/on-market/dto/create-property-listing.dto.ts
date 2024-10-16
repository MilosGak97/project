import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { BrightdataSnapshot } from "src/api/entities/brightdata-snapshot.entity";
import { Market } from "src/api/entities/property-market.entity"; 

export class CreatePropertyListingDto{
    @IsOptional()
    @Type(() => String)
    zpid: string // zpid
    
    @IsOptional()
    @Type(() => String)
    home_status: string // homeStatus

    @IsOptional()
    @Type(() => String)
    streetAddress: string // address.streetAddress

    @IsOptional()
    @Type(() => String)
    city: string // address.city
    
    @IsOptional()
    @Type(() => String)
    zipcode: string // address.zipcode
    
    @IsOptional()
    @Type(() => String)
    state: string // address.state
    
    @IsOptional()
    @Type(() => Number)
    bedrooms: number // bedrooms
    
    @IsOptional()
    @Type(() => Number)
    bathrooms: number // bathrooms
    
    @IsOptional()
    @Type(() => Number)
    price: number // price


    @IsOptional()
    @Type(() => String)
    longitude: string // longitude

    
    @IsOptional()
    @Type(() => String)
    latitude: string // latitude
 
    @IsOptional()
    @Type(() => Number)
    livingArea: number // livingArea



    @IsOptional()
    @Type(() => String)
    livingAreaUnitsShort: string // livingAreaUnitsShort
  
 
    @IsOptional()
    @Type(() => String)
    homeType: string // homeType
 
    @IsOptional()
    @Type(() => String)
    parcelId: string // parcelId
 
    @IsOptional()
    @Type(() => String)
    hdpTypeDimension: string // hdpTypeDimension


    @IsOptional()
    @Type(() => Number)
    photoCount: number // photoCount
    
    @IsOptional() 
    photos: any[] // photos
    
    @IsOptional()
    @Type(() => String)
    county: string // county
    
    @IsOptional()
    @Type(() => Object) // or use specific interface/type if you know the structure
    additionalInfo: object; // Holds JSON data

    @IsOptional()
    @IsString()
    snapshot: BrightdataSnapshot

    @IsOptional()
    market: Market

/*
 
    {    
        "yearBuilt": 1991, 
        "listingDataSource": "Phoenix",
         
        "hasBadGeocode": false,
        
   
        "lotSize": 91476,
        "lotAreaValue": 2.1,
        "lotAreaUnits": "Acres",
        "livingAreaValue": 1410,  
        "ssid": 176,
        "hdpUrl": "https://www.zillow.com/homedetails/616-S-Orange-Ave-APT-6E-Maplewood-NJ-07040/441727596_zpid/",  
        "livingAreaUnits": "Square Feet", 

        "isNonOwnerOccupied": "false",
 
 
        "daysOnZillow": 0,

        "brokerageName": "Compass New Jersey, Llc",
        "propertyTypeDimension": "Condo", 
        "timeZone": "America/New_York",

        "url": "https://www.zillow.com/homedetails/616-S-Orange-Ave-APT-6E-Maplewood-NJ-07040/441727596_zpid/",
        "countyFIPS": null,
        "countyID": "504",   
        "listingTypeDimension": "For Sale by Agent",
        "postingContact": [
            "{\"name\":\"Stephanie Mallios\",\"photo\":null}"
        ],
        "isOffMarket": false,   
              "overview": {
            "days_on_zillow": 4, 
        },
        "is_listed_by_management_company": false,
        "mls_id": "3928754",
        "timestamp": "2024-10-10T22:49:31.512Z",
        "input": {
            "url": "https://www.zillow.com/homedetails/616-S-Orange-Ave-APT-6E-Maplewood-NJ-07040/441727596_zpid/"
        }, 
    },

    
    "listing_provided_by": {
        "name": "Stephanie Mallios",
        "email": null,
        "company": "Compass New Jersey, Llc",
        "phone_number": "973-310-6816"
    },   


*/

}