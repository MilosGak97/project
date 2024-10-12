import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('property-listings')
export class PropertyListing{
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string


    @IsOptional()
    @Type(() => String)
    @Column()
    zpid?: string // zpid
    
    @IsOptional()
    @Type(() => String)
    @Column()
    homeStatus?: string // homeStatus

    @IsOptional()
    @Type(() => String)
    @Column()
    streetAddress?: string // address.streetAddress

    @IsOptional()
    @Type(() => String)
    @Column()
    city?: string // address.city
    
    @IsOptional()
    @Type(() => String)
    @Column()
    zipcode?: string // address.zipcode
    
    @IsOptional()
    @Type(() => String)
    @Column()
    state?: string // address.state
    
    @IsOptional()
    @Type(() => Number) 
    @Column({ type: 'integer', nullable: true })
    bedrooms?: number;
    
    @IsOptional()
    @Type(() => Number)
    @Column({ type: 'integer', nullable: true })
    bathrooms?: number // bathrooms
    
    @IsOptional()
    @Type(() => Number)
    @Column({ type: 'integer', nullable: true })
    price?: number // price


    @IsOptional()
    @Type(() => String)
    @Column()
    longitude?: string // longitude

    
    @IsOptional()
    @Type(() => String)
    @Column()
    latitude?: string // latitude
 
    @IsOptional()
    @Type(() => Number)
    @Column()
    livingArea?: number // livingArea



    @IsOptional()
    @Type(() => String)
    @Column()
    livingAreaUnitsShort?: string // livingAreaUnitsShort
  
 
    @IsOptional()
    @Type(() => String)
    @Column()
    homeType?: string // homeType
 
    @IsOptional()
    @Type(() => String)
    @Column()
    parcelId?: string // parcelId
 
    @IsOptional()
    @Type(() => String)
    @Column()
    hdpTypeDimension?: string // hdpTypeDimension


    @IsOptional()
    @Type(() => Number)
    @Column()
    photoCount?: number // photoCount
    
    @IsOptional() 
    @Column('json')
    photos?: any[] // photos
    
    @IsOptional()
    @Type(() => String)
    @Column()
    county?: string // county


    @IsOptional()
    @Column({ type: 'json', nullable: true }) // or 'json' if you prefer
    additionalInfo?: any




}

/* 

 {
        "zpid": 38940861,
        "city": "Union City",
        "state": "NJ",
        "homeStatus": "FOR_SALE",
        "address": {
            "city": "Union City",
            "streetAddress": "1412 Kerrigan Ave",
            "zipcode": "07087",
            "state": "NJ"
        },
        "isListingClaimedByCurrentSignedInUser": "false",
        "isCurrentSignedInAgentResponsible": "false",
        "bedrooms": 5,
        "bathrooms": 3,
        "price": 729000,
        "yearBuilt": 1903,
        "streetAddress": "1412 Kerrigan Ave",
        "zipcode": "07087",
        "isCurrentSignedInUserVerifiedOwner": "false",
        "isVerifiedClaimedByCurrentSignedInUser": "No",
        "listingDataSource": "Phoenix",
        "longitude": -74.04183,
        "latitude": 40.76358,
        "hasBadGeocode": false,
        "streetViewMetadataUrlMediaWallLatLong": "https://maps.googleapis.com/maps/api/streetview/metadata?location=40.76358,-74.04183&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&signature=rUf6SoHzfJVJAn8QGTTjKA2ZNe8=",
        "streetViewMetadataUrlMediaWallAddress": "https://maps.googleapis.com/maps/api/streetview/metadata?location=1412%20Kerrigan%20Ave%2C%20Union%20City%2C%20NJ%2007087&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&signature=faEidYwvVAp502SjTcrpqYkajqI=",
        "streetViewServiceUrl": "https://street-view-url.prod.zgk-partner.zillowapi.com?zpid=38940861&address=1412%20Kerrigan%20Ave%2C%20Union%20City%2C%20NJ%2007087&width=512&height=234&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&maxdistance=70&lat=40.76358&lon=-74.04183&signature=sjEEe8x6dKjTNuQrRQuvNRLoPB8=",
        "livingArea": 1900,
        "homeType": "MULTI_FAMILY",
        "lotSize": 2178,
        "lotAreaValue": 2178,
        "lotAreaUnits": "Square Feet",
        "livingAreaValue": 1900,
        "livingAreaUnitsShort": "sqft",
        "isUndisclosedAddress": "false",
        "zestimate": 646900,
        "rentZestimate": 4193,
        "currency": "USD",
        "hideZestimate": "false",
        "taxAssessedValue": 153300,
        "taxAssessedYear": 2023,
        "country": "USA",
        "propertyTaxRate": 1.67,
        "photoCount": 40,
        "isPremierBuilder": "false",
        "isZillowOwned": "false",
        "ssid": 176,
        "hdpUrl": "https://www.zillow.com/homedetails/1412-Kerrigan-Ave-Union-City-NJ-07087/38940861_zpid/",
        "tourViewCount": 0,
        "hasPublicVideo": false,
        "livingAreaUnits": "Square Feet",
        "hasApprovedThirdPartyVirtualTourUrl": false,
        "streetViewTileImageUrlMediumLatLong": "https://maps.googleapis.com/maps/api/streetview?location=40.76358,-74.04183&size=400x250&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&signature=Myqc3VM2V5VJpMZ4WqMxYPUgu14=",
        "isNonOwnerOccupied": "false",
        "zestimateLowPercent": "13",
        "zestimateHighPercent": "13",
        "restimateLowPercent": "8",
        "restimateHighPercent": "9",
        "description": "This is an income producing Investment opportunity in Union City, NJ Enjoy this well maintained updated 2 unit possible 3 unit home.   Be sure not to miss out. First floor unit 2-bedroom with fully finished basement.  The property has new windows, renovated kitchens, hardwood floors, washer and dryer and a  welcoming backyard for get togethers.  This investment property  includes off-street parking and is located directly across the street from local and NYC bus.   This is a great opportunity for any investor or multigenerational relatives.   Don't miss out on this amazing investment!",
        "parcelId": "1810000690000000190000",
        "taxHistory": [
            {
                "time": 1696572613495,
                "taxPaid": 11376.39,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1665036613495,
                "taxPaid": 1597.43,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1633500613495,
                "taxPaid": 1520.07,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1601964613495,
                "taxPaid": 1564.43,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1570342213495,
                "taxPaid": 10286.43,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1538806213495,
                "taxPaid": 10194.45,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1507270213495,
                "taxPaid": 10169.92,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1475734213495,
                "taxPaid": 9989.02,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1444111813495,
                "taxPaid": 9766.74,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1412575813495,
                "taxPaid": 9650.24,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1381039813495,
                "taxPaid": 9429.48,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1349503813495,
                "taxPaid": 9099.89,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1317881413495,
                "taxPaid": 8705.91,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1286345413495,
                "taxPaid": 8431.5,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1254809413495,
                "taxPaid": 8006.86,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1223273413495,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1191651013495,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1160115013495,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1128579013495,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1097043013495,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1065420613495,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1033884613495,
                "value": 153300,
                "valueIncreaseRate": 0
            },
            {
                "time": 1002348613495,
                "value": 153300,
                "valueIncreaseRate": 0
            }
        ],
        "priceHistory": [],
        "nearbyHomes": [
            "{\"zpid\":2120575496,\"miniCardPhotos\":[\"https://photos.zillowstatic.com/fp/b9a4dc081b20e487dcba8e4b8cab24ed-p_c.jpg\"],\"price\":408200,\"currency\":\"USD\",\"bedrooms\":2,\"bathrooms\":2,\"livingArea\":null,\"livingAreaValue\":null,\"livingAreaUnits\":null,\"livingAreaUnitsShort\":null,\"listingMetadata\":{\"comminglingCategoryIsRulesApplicable\":false},\"lotSize\":null,\"lotAreaValue\":null,\"lotAreaUnits\":\"sqft\",\"address\":{\"streetAddress\":\"4 Horizon Rd APT 405\",\"city\":\"Fort Lee\",\"state\":\"NJ\",\"zipcode\":\"07024\"},\"parentRegion\":null,\"formattedChip\":{\"location\":[\"4 Horizon Rd APT 405\",null]},\"latitude\":40.763725,\"longitude\":-74.04189,\"homeStatus\":\"OTHER\",\"homeType\":\"CONDO\",\"hdpUrl\":\"/homedetails/4-Horizon-Rd-APT-405-Fort-Lee-NJ-07024/2120575496_zpid/\",\"hdpTypeDimension\":\"Zestimate\",\"propertyTypeDimension\":\"Condo\",\"listingTypeDimension\":\"Unknown Listed By\",\"listing_sub_type\":{\"is_newHome\":false,\"is_forAuction\":false,\"is_bankOwned\":false,\"is_foreclosure\":false,\"is_FSBO\":false,\"is_comingSoon\":false,\"is_FSBA\":false},\"providerListingID\":null,\"attributionInfo\":\"{\\\"mlsId\\\":null,\\\"mlsName\\\":null,\\\"providerLogo\\\":null,\\\"agentName\\\":null,\\\"agentPhoneNumber\\\":null,\\\"brokerName\\\":null,\\\"brokerPhoneNumber\\\":null,\\\"trueStatus\\\":null}\",\"isShowcaseListing\":false,\"isPremierBuilder\":false,\"state\":\"NJ\",\"newConstructionType\":null}",
            "{\"zpid\":2058037661,\"miniCardPhotos\":[\"https://photos.zillowstatic.com/fp/b5a251e1e3931ff5b8990192fc20f3b7-p_c.jpg\"],\"price\":0,\"currency\":\"USD\",\"bedrooms\":3,\"bathrooms\":1,\"livingArea\":null,\"livingAreaValue\":null,\"livingAreaUnits\":null,\"livingAreaUnitsShort\":null,\"listingMetadata\":{\"comminglingCategoryIsRulesApplicable\":false},\"lotSize\":null,\"lotAreaValue\":null,\"lotAreaUnits\":\"sqft\",\"address\":{\"streetAddress\":\"1414 Kerrigan Ave APT 4\",\"city\":\"Union City\",\"state\":\"NJ\",\"zipcode\":\"07087\"},\"parentRegion\":null,\"formattedChip\":{\"location\":[\"1414 Kerrigan Ave APT 4\",null]},\"latitude\":40.763535,\"longitude\":-74.04153,\"homeStatus\":\"OTHER\",\"homeType\":\"APARTMENT\",\"hdpUrl\":\"/homedetails/1414-Kerrigan-Ave-APT-4-Union-City-NJ-07087/2058037661_zpid/\",\"hdpTypeDimension\":\"NoZestimate\",\"propertyTypeDimension\":\"Apartment\",\"listingTypeDimension\":\"Unknown Listed By\",\"listing_sub_type\":{\"is_newHome\":false,\"is_forAuction\":false,\"is_bankOwned\":false,\"is_foreclosure\":false,\"is_FSBO\":false,\"is_comingSoon\":false,\"is_FSBA\":false},\"providerListingID\":null,\"attributionInfo\":\"{\\\"mlsId\\\":null,\\\"mlsName\\\":null,\\\"providerLogo\\\":null,\\\"agentName\\\":null,\\\"agentPhoneNumber\\\":null,\\\"brokerName\\\":null,\\\"brokerPhoneNumber\\\":null,\\\"trueStatus\\\":null}\",\"isShowcaseListing\":false,\"isPremierBuilder\":false,\"state\":\"NJ\",\"newConstructionType\":null}",
            "{\"zpid\":2082067928,\"miniCardPhotos\":[\"https://photos.zillowstatic.com/fp/9065a5d521ed3658da4ed4e9a4c22fa5-p_c.jpg\"],\"price\":0,\"currency\":\"USD\",\"bedrooms\":2,\"bathrooms\":1,\"livingArea\":null,\"livingAreaValue\":null,\"livingAreaUnits\":null,\"livingAreaUnitsShort\":null,\"listingMetadata\":{\"comminglingCategoryIsRulesApplicable\":false},\"lotSize\":null,\"lotAreaValue\":null,\"lotAreaUnits\":\"sqft\",\"address\":{\"streetAddress\":\"1414 Kerrigan Ave APT 6\",\"city\":\"Union City\",\"state\":\"NJ\",\"zipcode\":\"07087\"},\"parentRegion\":null,\"formattedChip\":{\"location\":[\"1414 Kerrigan Ave APT 6\",null]},\"latitude\":40.763535,\"longitude\":-74.04153,\"homeStatus\":\"OTHER\",\"homeType\":\"APARTMENT\",\"hdpUrl\":\"/homedetails/1414-Kerrigan-Ave-APT-6-Union-City-NJ-07087/2082067928_zpid/\",\"hdpTypeDimension\":\"NoZestimate\",\"propertyTypeDimension\":\"Apartment\",\"listingTypeDimension\":\"Unknown Listed By\",\"listing_sub_type\":{\"is_newHome\":false,\"is_forAuction\":false,\"is_bankOwned\":false,\"is_foreclosure\":false,\"is_FSBO\":false,\"is_comingSoon\":false,\"is_FSBA\":false},\"providerListingID\":null,\"attributionInfo\":\"{\\\"mlsId\\\":null,\\\"mlsName\\\":null,\\\"providerLogo\\\":null,\\\"agentName\\\":null,\\\"agentPhoneNumber\\\":null,\\\"brokerName\\\":null,\\\"brokerPhoneNumber\\\":null,\\\"trueStatus\\\":null}\",\"isShowcaseListing\":false,\"isPremierBuilder\":false,\"state\":\"NJ\",\"newConstructionType\":null}",
            "{\"zpid\":2085085534,\"miniCardPhotos\":[\"https://photos.zillowstatic.com/fp/ef656dcd5af7ddf85d8d836ea0159ed0-p_c.jpg\"],\"price\":0,\"currency\":\"USD\",\"bedrooms\":3,\"bathrooms\":1,\"livingArea\":null,\"livingAreaValue\":null,\"livingAreaUnits\":null,\"livingAreaUnitsShort\":null,\"listingMetadata\":{\"comminglingCategoryIsRulesApplicable\":false},\"lotSize\":null,\"lotAreaValue\":null,\"lotAreaUnits\":\"sqft\",\"address\":{\"streetAddress\":\"1414 Kerrigan Ave APT 7\",\"city\":\"Union City\",\"state\":\"NJ\",\"zipcode\":\"07087\"},\"parentRegion\":null,\"formattedChip\":{\"location\":[\"1414 Kerrigan Ave APT 7\",null]},\"latitude\":40.763535,\"longitude\":-74.04153,\"homeStatus\":\"OTHER\",\"homeType\":\"APARTMENT\",\"hdpUrl\":\"/homedetails/1414-Kerrigan-Ave-APT-7-Union-City-NJ-07087/2085085534_zpid/\",\"hdpTypeDimension\":\"NoZestimate\",\"propertyTypeDimension\":\"Apartment\",\"listingTypeDimension\":\"Unknown Listed By\",\"listing_sub_type\":{\"is_newHome\":false,\"is_forAuction\":false,\"is_bankOwned\":false,\"is_foreclosure\":false,\"is_FSBO\":false,\"is_comingSoon\":false,\"is_FSBA\":false},\"providerListingID\":null,\"attributionInfo\":\"{\\\"mlsId\\\":null,\\\"mlsName\\\":null,\\\"providerLogo\\\":null,\\\"agentName\\\":null,\\\"agentPhoneNumber\\\":null,\\\"brokerName\\\":null,\\\"brokerPhoneNumber\\\":null,\\\"trueStatus\\\":null}\",\"isShowcaseListing\":false,\"isPremierBuilder\":false,\"state\":\"NJ\",\"newConstructionType\":null}",
            "{\"zpid\":2085809625,\"miniCardPhotos\":[\"https://photos.zillowstatic.com/fp/12d403dc7ad3504bc1d0050bbc65e5d6-p_c.jpg\"],\"price\":0,\"currency\":\"USD\",\"bedrooms\":2,\"bathrooms\":1,\"livingArea\":null,\"livingAreaValue\":null,\"livingAreaUnits\":null,\"livingAreaUnitsShort\":null,\"listingMetadata\":{\"comminglingCategoryIsRulesApplicable\":false},\"lotSize\":null,\"lotAreaValue\":null,\"lotAreaUnits\":\"sqft\",\"address\":{\"streetAddress\":\"1414 Kerrigan Ave APT 3\",\"city\":\"Union City\",\"state\":\"NJ\",\"zipcode\":\"07087\"},\"parentRegion\":null,\"formattedChip\":{\"location\":[\"1414 Kerrigan Ave APT 3\",null]},\"latitude\":40.763535,\"longitude\":-74.04153,\"homeStatus\":\"OTHER\",\"homeType\":\"APARTMENT\",\"hdpUrl\":\"/homedetails/1414-Kerrigan-Ave-APT-3-Union-City-NJ-07087/2085809625_zpid/\",\"hdpTypeDimension\":\"NoZestimate\",\"propertyTypeDimension\":\"Apartment\",\"listingTypeDimension\":\"Unknown Listed By\",\"listing_sub_type\":{\"is_newHome\":false,\"is_forAuction\":false,\"is_bankOwned\":false,\"is_foreclosure\":false,\"is_FSBO\":false,\"is_comingSoon\":false,\"is_FSBA\":false},\"providerListingID\":null,\"attributionInfo\":\"{\\\"mlsId\\\":null,\\\"mlsName\\\":null,\\\"providerLogo\\\":null,\\\"agentName\\\":null,\\\"agentPhoneNumber\\\":null,\\\"brokerName\\\":null,\\\"brokerPhoneNumber\\\":null,\\\"trueStatus\\\":null}\",\"isShowcaseListing\":false,\"isPremierBuilder\":false,\"state\":\"NJ\",\"newConstructionType\":null}",
            "{\"zpid\":38940862,\"miniCardPhotos\":[\"https://photos.zillowstatic.com/fp/a434d5685d704d3a068faf28002801ec-p_c.jpg\"],\"price\":755900,\"currency\":\"USD\",\"bedrooms\":6,\"bathrooms\":2,\"livingArea\":null,\"livingAreaValue\":null,\"livingAreaUnits\":null,\"livingAreaUnitsShort\":null,\"listingMetadata\":{\"comminglingCategoryIsRulesApplicable\":false},\"lotSize\":2500,\"lotAreaValue\":2500,\"lotAreaUnits\":\"Square Feet\",\"address\":{\"streetAddress\":\"1410 Kerrigan Ave\",\"city\":\"Union City\",\"state\":\"NJ\",\"zipcode\":\"07087\"},\"parentRegion\":null,\"formattedChip\":{\"location\":[\"1410 Kerrigan Ave\",null]},\"latitude\":40.763416,\"longitude\":-74.041595,\"homeStatus\":\"OTHER\",\"homeType\":\"MULTI_FAMILY\",\"hdpUrl\":\"/homedetails/1410-Kerrigan-Ave-Union-City-NJ-07087/38940862_zpid/\",\"hdpTypeDimension\":\"Zestimate\",\"propertyTypeDimension\":\"Multi Family\",\"listingTypeDimension\":\"Unknown Listed By\",\"listing_sub_type\":{\"is_newHome\":false,\"is_forAuction\":false,\"is_bankOwned\":false,\"is_foreclosure\":false,\"is_FSBO\":false,\"is_comingSoon\":false,\"is_FSBA\":false},\"providerListingID\":null,\"attributionInfo\":\"{\\\"mlsId\\\":null,\\\"mlsName\\\":null,\\\"providerLogo\\\":null,\\\"agentName\\\":null,\\\"agentPhoneNumber\\\":null,\\\"brokerName\\\":null,\\\"brokerPhoneNumber\\\":null,\\\"trueStatus\\\":null}\",\"isShowcaseListing\":false,\"isPremierBuilder\":false,\"state\":\"NJ\",\"newConstructionType\":null}",
            "{\"zpid\":2089051354,\"miniCardPhotos\":[\"https://photos.zillowstatic.com/fp/298753a6d53be68019f09d34aac1a506-p_c.jpg\"],\"price\":940300,\"currency\":\"USD\",\"bedrooms\":3,\"bathrooms\":4,\"livingArea\":null,\"livingAreaValue\":null,\"livingAreaUnits\":null,\"livingAreaUnitsShort\":null,\"listingMetadata\":{\"comminglingCategoryIsRulesApplicable\":false},\"lotSize\":null,\"lotAreaValue\":null,\"lotAreaUnits\":\"sqft\",\"address\":{\"streetAddress\":\"1415 W 15th St\",\"city\":\"Union City\",\"state\":\"NJ\",\"zipcode\":\"07087\"},\"parentRegion\":null,\"formattedChip\":{\"location\":[\"1415 W 15th St\",null]},\"latitude\":40.763775,\"longitude\":-74.04203,\"homeStatus\":\"OTHER\",\"homeType\":\"SINGLE_FAMILY\",\"hdpUrl\":\"/homedetails/1415-W-15th-St-Union-City-NJ-07087/2089051354_zpid/\",\"hdpTypeDimension\":\"Zestimate\",\"propertyTypeDimension\":\"Single Family\",\"listingTypeDimension\":\"Unknown Listed By\",\"listing_sub_type\":{\"is_newHome\":false,\"is_forAuction\":false,\"is_bankOwned\":false,\"is_foreclosure\":false,\"is_FSBO\":false,\"is_comingSoon\":false,\"is_FSBA\":false},\"providerListingID\":null,\"attributionInfo\":\"{\\\"mlsId\\\":null,\\\"mlsName\\\":null,\\\"providerLogo\\\":null,\\\"agentName\\\":null,\\\"agentPhoneNumber\\\":null,\\\"brokerName\\\":null,\\\"brokerPhoneNumber\\\":null,\\\"trueStatus\\\":null}\",\"isShowcaseListing\":false,\"isPremierBuilder\":false,\"state\":\"NJ\",\"newConstructionType\":null}",
            "{\"zpid\":38940863,\"miniCardPhotos\":[\"https://maps.googleapis.com/maps/api/staticmap?mobile=false&sensor=true&maptype=satellite&size=316x234&zoom=17&center=40.763362884521484,-74.04164123535156&key=AIzaSyBJsNQO5ZeG-XAbqqWLKwG08fWITSxg33w&&signature=g65eTrI28NB5CH4MJQwtkMrsnM8=\"],\"price\":829300,\"currency\":\"USD\",\"bedrooms\":7,\"bathrooms\":3,\"livingArea\":3627,\"livingAreaValue\":3627,\"livingAreaUnits\":\"Square Feet\",\"livingAreaUnitsShort\":\"sqft\",\"listingMetadata\":{\"comminglingCategoryIsRulesApplicable\":false},\"lotSize\":2326,\"lotAreaValue\":2326,\"lotAreaUnits\":\"Square Feet\",\"address\":{\"streetAddress\":\"1408 Kerrigan Ave\",\"city\":\"Union City\",\"state\":\"NJ\",\"zipcode\":\"07087\"},\"parentRegion\":null,\"formattedChip\":{\"location\":[\"1408 Kerrigan Ave\",null]},\"latitude\":40.763363,\"longitude\":-74.04164,\"homeStatus\":\"OTHER\",\"homeType\":\"MULTI_FAMILY\",\"hdpUrl\":\"/homedetails/1408-Kerrigan-Ave-Union-City-NJ-07087/38940863_zpid/\",\"hdpTypeDimension\":\"Zestimate\",\"propertyTypeDimension\":\"Multi Family\",\"listingTypeDimension\":\"Unknown Listed By\",\"listing_sub_type\":{\"is_newHome\":false,\"is_forAuction\":false,\"is_bankOwned\":false,\"is_foreclosure\":false,\"is_FSBO\":false,\"is_comingSoon\":false,\"is_FSBA\":false},\"providerListingID\":null,\"attributionInfo\":\"{\\\"mlsId\\\":null,\\\"mlsName\\\":null,\\\"providerLogo\\\":null,\\\"agentName\\\":null,\\\"agentPhoneNumber\\\":null,\\\"brokerName\\\":null,\\\"brokerPhoneNumber\\\":null,\\\"trueStatus\\\":null}\",\"isShowcaseListing\":false,\"isPremierBuilder\":false,\"state\":\"NJ\",\"newConstructionType\":null}"
        ],
        "schools": [
            {
                "distance": 0.1,
                "name": "Sara M. Gilmore Academy",
                "rating": 10,
                "level": "Elementary",
                "grades": "1-8",
                "link": "https://www.greatschools.org/new-jersey/weehawken/1993-Woodrow-Wilson-School/",
                "type": "Public"
            },
            {
                "distance": 0.3,
                "name": "Jose Marti Freshman Academy",
                "rating": 8,
                "level": "High",
                "grades": "9-12",
                "link": "https://www.greatschools.org/new-jersey/union-city/4246-Jose-Marti-Freshman-Academy/",
                "type": "Public"
            },
            {
                "distance": 0.1,
                "name": "Veterans Memorial School",
                "rating": 6,
                "level": "Primary",
                "grades": "PK-5",
                "link": "https://www.greatschools.org/new-jersey/union-city/4165-Veterans-Memorial-School/",
                "type": "Public"
            }
        ],
        "mortgageRates": {
            "thirtyYearFixedRate": 6.002
        },
        "isInstantOfferEnabled": "No",
        "isRentalListingOffMarket": "false",
        "nearbyCities": [
            {
                "regionUrl": {
                    "path": "/bayonne-nj/"
                },
                "name": "Bayonne"
            },
            {
                "regionUrl": {
                    "path": "/harrison-nj/"
                },
                "name": "Harrison"
            },
            {
                "regionUrl": {
                    "path": "/hoboken-nj/"
                },
                "name": "Hoboken"
            },
            {
                "regionUrl": {
                    "path": "/jersey-city-nj/"
                },
                "name": "Jersey City"
            },
            {
                "regionUrl": {
                    "path": "/kearny-nj/"
                },
                "name": "Kearny"
            },
            {
                "regionUrl": {
                    "path": "/north-bergen-township-nj/"
                },
                "name": "North Bergen Township"
            },
            {
                "regionUrl": {
                    "path": "/secaucus-nj/"
                },
                "name": "Secaucus"
            },
            {
                "regionUrl": {
                    "path": "/union-city-nj/"
                },
                "name": "Union City"
            },
            {
                "regionUrl": {
                    "path": "/weehawken-nj/"
                },
                "name": "Weehawken"
            },
            {
                "regionUrl": {
                    "path": "/west-new-york-nj/"
                },
                "name": "West New York"
            }
        ],
        "nearbyNeighborhoods": [],
        "nearbyZipcodes": [
            {
                "regionUrl": {
                    "path": "/union-city-nj-07087/"
                },
                "name": "07087"
            }
        ],
        "abbreviatedAddress": "1412 Kerrigan Ave",
        "daysOnZillow": 0,
        "rentalApplicationsAcceptedType": "REQUEST_TO_APPLY",
        "brokerageName": "Keller Williams Realty",
        "propertyTypeDimension": "Multi Family",
        "hdpTypeDimension": "ComingSoon",
        "timeZone": "America/New_York",
        "tourEligibility": {
            "isPropertyTourEligible": false
        },
        "selfTour": {
            "hasSelfTour": false
        },
        "photos": [
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/b515d435793ecad20726662466289ee5-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b515d435793ecad20726662466289ee5-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b515d435793ecad20726662466289ee5-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b515d435793ecad20726662466289ee5-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b515d435793ecad20726662466289ee5-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b515d435793ecad20726662466289ee5-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b515d435793ecad20726662466289ee5-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b515d435793ecad20726662466289ee5-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/b9853d90fcf73767a20276ba0918fe06-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b9853d90fcf73767a20276ba0918fe06-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b9853d90fcf73767a20276ba0918fe06-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b9853d90fcf73767a20276ba0918fe06-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b9853d90fcf73767a20276ba0918fe06-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b9853d90fcf73767a20276ba0918fe06-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b9853d90fcf73767a20276ba0918fe06-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b9853d90fcf73767a20276ba0918fe06-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/8ecd52f98ba7b5c714d77e3ad678d71b-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8ecd52f98ba7b5c714d77e3ad678d71b-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8ecd52f98ba7b5c714d77e3ad678d71b-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8ecd52f98ba7b5c714d77e3ad678d71b-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8ecd52f98ba7b5c714d77e3ad678d71b-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8ecd52f98ba7b5c714d77e3ad678d71b-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8ecd52f98ba7b5c714d77e3ad678d71b-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8ecd52f98ba7b5c714d77e3ad678d71b-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/935ba97c5b65ca01c39b23ca6ed7025c-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/935ba97c5b65ca01c39b23ca6ed7025c-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/935ba97c5b65ca01c39b23ca6ed7025c-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/935ba97c5b65ca01c39b23ca6ed7025c-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/935ba97c5b65ca01c39b23ca6ed7025c-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/935ba97c5b65ca01c39b23ca6ed7025c-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/935ba97c5b65ca01c39b23ca6ed7025c-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/935ba97c5b65ca01c39b23ca6ed7025c-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/f5fc1558d428109f0cb90d3972afb1f3-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f5fc1558d428109f0cb90d3972afb1f3-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f5fc1558d428109f0cb90d3972afb1f3-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f5fc1558d428109f0cb90d3972afb1f3-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f5fc1558d428109f0cb90d3972afb1f3-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f5fc1558d428109f0cb90d3972afb1f3-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f5fc1558d428109f0cb90d3972afb1f3-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f5fc1558d428109f0cb90d3972afb1f3-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/1b159d4582c4e2d84cb70459b1419ec4-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1b159d4582c4e2d84cb70459b1419ec4-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1b159d4582c4e2d84cb70459b1419ec4-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1b159d4582c4e2d84cb70459b1419ec4-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1b159d4582c4e2d84cb70459b1419ec4-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1b159d4582c4e2d84cb70459b1419ec4-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1b159d4582c4e2d84cb70459b1419ec4-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1b159d4582c4e2d84cb70459b1419ec4-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/9a6614139d2dbc91081364682188eece-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/9a6614139d2dbc91081364682188eece-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/9a6614139d2dbc91081364682188eece-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/9a6614139d2dbc91081364682188eece-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/9a6614139d2dbc91081364682188eece-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/9a6614139d2dbc91081364682188eece-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/9a6614139d2dbc91081364682188eece-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/9a6614139d2dbc91081364682188eece-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/930b95a1c597471316a1c69b982ab646-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/930b95a1c597471316a1c69b982ab646-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/930b95a1c597471316a1c69b982ab646-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/930b95a1c597471316a1c69b982ab646-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/930b95a1c597471316a1c69b982ab646-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/930b95a1c597471316a1c69b982ab646-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/930b95a1c597471316a1c69b982ab646-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/930b95a1c597471316a1c69b982ab646-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/aa23f5fdef1152e95c009c7f672932dd-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/aa23f5fdef1152e95c009c7f672932dd-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/aa23f5fdef1152e95c009c7f672932dd-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/aa23f5fdef1152e95c009c7f672932dd-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/aa23f5fdef1152e95c009c7f672932dd-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/aa23f5fdef1152e95c009c7f672932dd-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/aa23f5fdef1152e95c009c7f672932dd-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/aa23f5fdef1152e95c009c7f672932dd-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/8a1867d48e1bf85a2c068da868248435-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8a1867d48e1bf85a2c068da868248435-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8a1867d48e1bf85a2c068da868248435-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8a1867d48e1bf85a2c068da868248435-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8a1867d48e1bf85a2c068da868248435-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8a1867d48e1bf85a2c068da868248435-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8a1867d48e1bf85a2c068da868248435-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/8a1867d48e1bf85a2c068da868248435-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba0d7e53f18ee9718f0060564925cfc5-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba0d7e53f18ee9718f0060564925cfc5-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba0d7e53f18ee9718f0060564925cfc5-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba0d7e53f18ee9718f0060564925cfc5-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba0d7e53f18ee9718f0060564925cfc5-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba0d7e53f18ee9718f0060564925cfc5-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba0d7e53f18ee9718f0060564925cfc5-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba0d7e53f18ee9718f0060564925cfc5-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/be04cf0227d173ca86caeb95d37db90d-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/be04cf0227d173ca86caeb95d37db90d-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/be04cf0227d173ca86caeb95d37db90d-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/be04cf0227d173ca86caeb95d37db90d-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/be04cf0227d173ca86caeb95d37db90d-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/be04cf0227d173ca86caeb95d37db90d-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/be04cf0227d173ca86caeb95d37db90d-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/be04cf0227d173ca86caeb95d37db90d-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/39075591a42ee627a19c3915411055a1-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/39075591a42ee627a19c3915411055a1-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/39075591a42ee627a19c3915411055a1-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/39075591a42ee627a19c3915411055a1-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/39075591a42ee627a19c3915411055a1-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/39075591a42ee627a19c3915411055a1-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/39075591a42ee627a19c3915411055a1-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/39075591a42ee627a19c3915411055a1-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/a87b50b76a9249d9a4e7833f7e3dda0e-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a87b50b76a9249d9a4e7833f7e3dda0e-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a87b50b76a9249d9a4e7833f7e3dda0e-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a87b50b76a9249d9a4e7833f7e3dda0e-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a87b50b76a9249d9a4e7833f7e3dda0e-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a87b50b76a9249d9a4e7833f7e3dda0e-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a87b50b76a9249d9a4e7833f7e3dda0e-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a87b50b76a9249d9a4e7833f7e3dda0e-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/4360ddab1b2e6cb46f15477e065f53c3-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/4360ddab1b2e6cb46f15477e065f53c3-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/4360ddab1b2e6cb46f15477e065f53c3-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/4360ddab1b2e6cb46f15477e065f53c3-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/4360ddab1b2e6cb46f15477e065f53c3-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/4360ddab1b2e6cb46f15477e065f53c3-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/4360ddab1b2e6cb46f15477e065f53c3-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/4360ddab1b2e6cb46f15477e065f53c3-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/d060226d618c36048e67c41b01745a20-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d060226d618c36048e67c41b01745a20-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d060226d618c36048e67c41b01745a20-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d060226d618c36048e67c41b01745a20-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d060226d618c36048e67c41b01745a20-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d060226d618c36048e67c41b01745a20-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d060226d618c36048e67c41b01745a20-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d060226d618c36048e67c41b01745a20-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/efc78eb56738692bc098bd68ed5d4dad-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/efc78eb56738692bc098bd68ed5d4dad-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/efc78eb56738692bc098bd68ed5d4dad-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/efc78eb56738692bc098bd68ed5d4dad-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/efc78eb56738692bc098bd68ed5d4dad-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/efc78eb56738692bc098bd68ed5d4dad-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/efc78eb56738692bc098bd68ed5d4dad-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/efc78eb56738692bc098bd68ed5d4dad-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/e21d48524c62f0ddedf85535f5d97c73-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/e21d48524c62f0ddedf85535f5d97c73-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/e21d48524c62f0ddedf85535f5d97c73-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/e21d48524c62f0ddedf85535f5d97c73-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/e21d48524c62f0ddedf85535f5d97c73-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/e21d48524c62f0ddedf85535f5d97c73-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/e21d48524c62f0ddedf85535f5d97c73-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/e21d48524c62f0ddedf85535f5d97c73-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/683eb31b1020b9ae89e240f54f8545bd-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/683eb31b1020b9ae89e240f54f8545bd-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/683eb31b1020b9ae89e240f54f8545bd-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/683eb31b1020b9ae89e240f54f8545bd-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/683eb31b1020b9ae89e240f54f8545bd-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/683eb31b1020b9ae89e240f54f8545bd-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/683eb31b1020b9ae89e240f54f8545bd-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/683eb31b1020b9ae89e240f54f8545bd-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/2bd5359072be3fa9200f322bbaad0ef8-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/2bd5359072be3fa9200f322bbaad0ef8-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/2bd5359072be3fa9200f322bbaad0ef8-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/2bd5359072be3fa9200f322bbaad0ef8-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/2bd5359072be3fa9200f322bbaad0ef8-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/2bd5359072be3fa9200f322bbaad0ef8-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/2bd5359072be3fa9200f322bbaad0ef8-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/2bd5359072be3fa9200f322bbaad0ef8-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/c9bd82b5bc1acb68bc7251366d30dc40-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c9bd82b5bc1acb68bc7251366d30dc40-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c9bd82b5bc1acb68bc7251366d30dc40-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c9bd82b5bc1acb68bc7251366d30dc40-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c9bd82b5bc1acb68bc7251366d30dc40-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c9bd82b5bc1acb68bc7251366d30dc40-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c9bd82b5bc1acb68bc7251366d30dc40-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c9bd82b5bc1acb68bc7251366d30dc40-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/0966a39f2f1f7c05c5daa8dd78b6acdc-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/0966a39f2f1f7c05c5daa8dd78b6acdc-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/0966a39f2f1f7c05c5daa8dd78b6acdc-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/0966a39f2f1f7c05c5daa8dd78b6acdc-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/0966a39f2f1f7c05c5daa8dd78b6acdc-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/0966a39f2f1f7c05c5daa8dd78b6acdc-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/0966a39f2f1f7c05c5daa8dd78b6acdc-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/0966a39f2f1f7c05c5daa8dd78b6acdc-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/1e9728a5512fe8bd35a368e43c786385-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1e9728a5512fe8bd35a368e43c786385-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1e9728a5512fe8bd35a368e43c786385-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1e9728a5512fe8bd35a368e43c786385-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1e9728a5512fe8bd35a368e43c786385-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1e9728a5512fe8bd35a368e43c786385-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1e9728a5512fe8bd35a368e43c786385-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/1e9728a5512fe8bd35a368e43c786385-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/6d39ae4894e1ec26a078a3bf27f6cf3a-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/6d39ae4894e1ec26a078a3bf27f6cf3a-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/6d39ae4894e1ec26a078a3bf27f6cf3a-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/6d39ae4894e1ec26a078a3bf27f6cf3a-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/6d39ae4894e1ec26a078a3bf27f6cf3a-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/6d39ae4894e1ec26a078a3bf27f6cf3a-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/6d39ae4894e1ec26a078a3bf27f6cf3a-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/6d39ae4894e1ec26a078a3bf27f6cf3a-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/b15fbb56963e76e49be63aaca7f8042b-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b15fbb56963e76e49be63aaca7f8042b-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b15fbb56963e76e49be63aaca7f8042b-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b15fbb56963e76e49be63aaca7f8042b-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b15fbb56963e76e49be63aaca7f8042b-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b15fbb56963e76e49be63aaca7f8042b-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b15fbb56963e76e49be63aaca7f8042b-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b15fbb56963e76e49be63aaca7f8042b-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/a403c15759ece9b3d713079819e6c75e-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a403c15759ece9b3d713079819e6c75e-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a403c15759ece9b3d713079819e6c75e-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a403c15759ece9b3d713079819e6c75e-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a403c15759ece9b3d713079819e6c75e-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a403c15759ece9b3d713079819e6c75e-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a403c15759ece9b3d713079819e6c75e-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/a403c15759ece9b3d713079819e6c75e-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/b8a3d599eca0ea5864711fb5197790dd-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b8a3d599eca0ea5864711fb5197790dd-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b8a3d599eca0ea5864711fb5197790dd-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b8a3d599eca0ea5864711fb5197790dd-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b8a3d599eca0ea5864711fb5197790dd-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b8a3d599eca0ea5864711fb5197790dd-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b8a3d599eca0ea5864711fb5197790dd-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/b8a3d599eca0ea5864711fb5197790dd-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec584f86394003dfdee130cf5dfd2e59-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec584f86394003dfdee130cf5dfd2e59-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec584f86394003dfdee130cf5dfd2e59-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec584f86394003dfdee130cf5dfd2e59-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec584f86394003dfdee130cf5dfd2e59-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec584f86394003dfdee130cf5dfd2e59-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec584f86394003dfdee130cf5dfd2e59-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec584f86394003dfdee130cf5dfd2e59-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/61d1414771c54d99d6a2d9ba9b424053-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/61d1414771c54d99d6a2d9ba9b424053-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/61d1414771c54d99d6a2d9ba9b424053-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/61d1414771c54d99d6a2d9ba9b424053-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/61d1414771c54d99d6a2d9ba9b424053-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/61d1414771c54d99d6a2d9ba9b424053-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/61d1414771c54d99d6a2d9ba9b424053-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/61d1414771c54d99d6a2d9ba9b424053-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/c7720636a30a63464aaca5d4ed08c1e4-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c7720636a30a63464aaca5d4ed08c1e4-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c7720636a30a63464aaca5d4ed08c1e4-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c7720636a30a63464aaca5d4ed08c1e4-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c7720636a30a63464aaca5d4ed08c1e4-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c7720636a30a63464aaca5d4ed08c1e4-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c7720636a30a63464aaca5d4ed08c1e4-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/c7720636a30a63464aaca5d4ed08c1e4-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/766f89b79774c72b83b59d5c2d6534bb-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/766f89b79774c72b83b59d5c2d6534bb-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/766f89b79774c72b83b59d5c2d6534bb-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/766f89b79774c72b83b59d5c2d6534bb-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/766f89b79774c72b83b59d5c2d6534bb-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/766f89b79774c72b83b59d5c2d6534bb-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/766f89b79774c72b83b59d5c2d6534bb-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/766f89b79774c72b83b59d5c2d6534bb-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec5ca740d3c9a0a99ad0d9da9df20328-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec5ca740d3c9a0a99ad0d9da9df20328-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec5ca740d3c9a0a99ad0d9da9df20328-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec5ca740d3c9a0a99ad0d9da9df20328-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec5ca740d3c9a0a99ad0d9da9df20328-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec5ca740d3c9a0a99ad0d9da9df20328-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec5ca740d3c9a0a99ad0d9da9df20328-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ec5ca740d3c9a0a99ad0d9da9df20328-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba6d5ce399be71704ecb1dbbfefdb51b-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba6d5ce399be71704ecb1dbbfefdb51b-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba6d5ce399be71704ecb1dbbfefdb51b-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba6d5ce399be71704ecb1dbbfefdb51b-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba6d5ce399be71704ecb1dbbfefdb51b-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba6d5ce399be71704ecb1dbbfefdb51b-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba6d5ce399be71704ecb1dbbfefdb51b-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/ba6d5ce399be71704ecb1dbbfefdb51b-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/f713030bfa7d7cf5132f0975f6e23a47-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f713030bfa7d7cf5132f0975f6e23a47-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f713030bfa7d7cf5132f0975f6e23a47-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f713030bfa7d7cf5132f0975f6e23a47-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f713030bfa7d7cf5132f0975f6e23a47-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f713030bfa7d7cf5132f0975f6e23a47-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f713030bfa7d7cf5132f0975f6e23a47-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f713030bfa7d7cf5132f0975f6e23a47-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/113855899ec78814ec0831406d53ca1e-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/113855899ec78814ec0831406d53ca1e-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/113855899ec78814ec0831406d53ca1e-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/113855899ec78814ec0831406d53ca1e-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/113855899ec78814ec0831406d53ca1e-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/113855899ec78814ec0831406d53ca1e-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/113855899ec78814ec0831406d53ca1e-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/113855899ec78814ec0831406d53ca1e-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/37a74e96ece9d15a4ff382c6cc75bc1b-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/37a74e96ece9d15a4ff382c6cc75bc1b-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/37a74e96ece9d15a4ff382c6cc75bc1b-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/37a74e96ece9d15a4ff382c6cc75bc1b-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/37a74e96ece9d15a4ff382c6cc75bc1b-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/37a74e96ece9d15a4ff382c6cc75bc1b-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/37a74e96ece9d15a4ff382c6cc75bc1b-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/37a74e96ece9d15a4ff382c6cc75bc1b-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/42c7371c878c29e5aab81b2276c75346-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/42c7371c878c29e5aab81b2276c75346-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/42c7371c878c29e5aab81b2276c75346-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/42c7371c878c29e5aab81b2276c75346-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/42c7371c878c29e5aab81b2276c75346-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/42c7371c878c29e5aab81b2276c75346-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/42c7371c878c29e5aab81b2276c75346-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/42c7371c878c29e5aab81b2276c75346-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/12be2cb6651e4ce17d18ed0ec4dad27c-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/12be2cb6651e4ce17d18ed0ec4dad27c-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/12be2cb6651e4ce17d18ed0ec4dad27c-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/12be2cb6651e4ce17d18ed0ec4dad27c-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/12be2cb6651e4ce17d18ed0ec4dad27c-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/12be2cb6651e4ce17d18ed0ec4dad27c-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/12be2cb6651e4ce17d18ed0ec4dad27c-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/12be2cb6651e4ce17d18ed0ec4dad27c-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/f115803f34ed38582dc1d9406d6058dd-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f115803f34ed38582dc1d9406d6058dd-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f115803f34ed38582dc1d9406d6058dd-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f115803f34ed38582dc1d9406d6058dd-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f115803f34ed38582dc1d9406d6058dd-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f115803f34ed38582dc1d9406d6058dd-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f115803f34ed38582dc1d9406d6058dd-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/f115803f34ed38582dc1d9406d6058dd-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            },
            {
                "mixedSources": {
                    "jpeg": [
                        {
                            "url": "https://photos.zillowstatic.com/fp/d2e20389eaa4dc1c941e5ef8821b8148-cc_ft_192.jpg",
                            "width": 192
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d2e20389eaa4dc1c941e5ef8821b8148-cc_ft_384.jpg",
                            "width": 384
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d2e20389eaa4dc1c941e5ef8821b8148-cc_ft_576.jpg",
                            "width": 576
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d2e20389eaa4dc1c941e5ef8821b8148-cc_ft_768.jpg",
                            "width": 768
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d2e20389eaa4dc1c941e5ef8821b8148-cc_ft_960.jpg",
                            "width": 960
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d2e20389eaa4dc1c941e5ef8821b8148-cc_ft_1152.jpg",
                            "width": 1152
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d2e20389eaa4dc1c941e5ef8821b8148-cc_ft_1344.jpg",
                            "width": 1344
                        },
                        {
                            "url": "https://photos.zillowstatic.com/fp/d2e20389eaa4dc1c941e5ef8821b8148-cc_ft_1536.jpg",
                            "width": 1536
                        }
                    ]
                }
            }
        ],
        "resoFacts:sewer": "Public Sewer",
        "resoFacts:waterSource": "Public",
        "utilities": [],
        "url": "https://www.zillow.com/homedetails/1412-Kerrigan-Ave-Union-City-NJ-07087/38940861_zpid/",
        "countyFIPS": "34017",
        "countyID": "1106",
        "isFeatured": false,
        "isHousingConnector": false,
        "isRentalsLeadCapMet": false,
        "listingTypeDimension": "Coming Soon",
        "postingContact": [
            "{\"name\":\"Louise Difabio\",\"photo\":null}"
        ],
        "isOffMarket": false,
        "resofacts_sewer": "Public Sewer",
        "resofacts_water_source": "Public",
        "citySearchUrl": {
            "path": "/union-city-nj/",
            "text": "Homes in Union City"
        },
        "county": "Hudson County",
        "is_showcased": false,
        "interior": {
            "bedrooms_and_bathrooms": {
                "bedrooms": 5,
                "bathrooms": 3,
                "full_bathrooms": 3,
                "half_bathroom": "0"
            },
            "heating": "Radiators - Hot Water, Natural Gas",
            "other_interior_features": "Total structure area :1,900, Total interior livable area :1,900 sqft"
        },
        "overview": {
            "days_on_zillow": 17,
            "number_of_views": 150,
            "number_of_saves": 21
        },
        "is_listed_by_management_company": false,
        "listing_provided_by": {
            "name": "Louise Difabio",
            "email": null,
            "company": "Keller Williams Realty",
            "phone_number": "908-233-8502"
        },
        "hoa_details": {
            "has_hoa": null,
            "hoa_fee_value": null,
            "hoa_fee_currency": null,
            "hoa_fee_period": null,
            "services_included": null,
            "amenities_included": null
        },
        "financial": [
            {
                "agency_fee": null
            }
        ],
        "interior_full": [
            {
                "title": "Bedrooms & bathrooms",
                "values": [
                    "Bedrooms: 5",
                    "Bathrooms: 3",
                    "Full bathrooms: 3"
                ]
            },
            {
                "title": "Heating",
                "values": [
                    "Heating features: Radiators - Hot Water,Natural Gas"
                ]
            },
            {
                "title": "Cooling",
                "values": [
                    "Cooling features: Window Unit(s)"
                ]
            },
            {
                "title": "Appliances",
                "values": [
                    "Appliances included: Dryer,Washer,Range/Oven - Gas,Refrigerator,Gas Water Heater"
                ]
            },
            {
                "title": "Basement",
                "values": [
                    "Has basement: Yes",
                    "Basement: Yes,Finished"
                ]
            },
            {
                "title": "Features",
                "values": [
                    "Bedrooms,Den,Family Room,Kitchen,Living Room,Dining Room"
                ]
            },
            {
                "title": "Interior area",
                "values": [
                    "Total structure area: 1,900",
                    "Total interior livable area: 1,900 sqft"
                ]
            }
        ],
        "property": [
            {
                "title": "Parking",
                "values": [
                    "Parking features: On Street"
                ]
            },
            {
                "title": "Features",
                "values": [
                    "Levels: Two",
                    "Stories: 2"
                ]
            },
            {
                "title": "Lot",
                "values": [
                    "Lot size: 2,178 sqft",
                    "Lot size dimensions: 23.55 x 99.15 AVG"
                ]
            },
            {
                "title": "Details",
                "values": [
                    "Parcel numbe: 1810000690000000190000"
                ]
            }
        ],
        "construction": [
            {
                "title": "Type & style",
                "values": [
                    "Home type: MultiFamily",
                    "Property subType: Multi Family"
                ]
            },
            {
                "title": "Materials",
                "values": [
                    "Roof: Asphalt Shingle",
                    "Construction materials: Vinyl Siding"
                ]
            },
            {
                "title": "Condition",
                "values": [
                    "Year built: 1903"
                ]
            }
        ],
        "tag": null,
        "contingent_listing_type": null,
        "unit_number": null,
        "unit_amenities": null,
        "timestamp": "2024-10-06T06:10:19.000Z",
        "input": {
            "url": "https://www.zillow.com/homedetails/1412-Kerrigan-Ave-Union-City-NJ-07087/38940861_zpid/"
        },
        "discovery_input": {
            "url": "https://www.zillow.com/hudson-county-nj/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22west%22%3A-76.04974748828124%2C%22east%22%3A-72.83624651171874%2C%22south%22%3A40.18319814696894%2C%22north%22%3A41.80829765600374%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A1106%2C%22regionType%22%3A4%7D%2C%7B%22regionId%22%3A874%2C%22regionType%22%3A4%7D%2C%7B%22regionId%22%3A1964%2C%22regionType%22%3A4%7D%2C%7B%22regionId%22%3A1413%2C%22regionType%22%3A4%7D%5D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22pnd%22%3A%7B%22value%22%3Atrue%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%2C%22doz%22%3A%7B%22value%22%3A%221%22%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A9%2C%22usersSearchTerm%22%3A%22Hudson%20County%20NJ%2C%20Bergen%20County%20NJ%2C%20Passaic%20County%20NJ%2C%20Sussex%20County%20NJ%22%7D"
        }
    }

    */