import { ConflictException, Injectable } from "@nestjs/common";
import { PropertyListing } from "src/api/entities/property-listing.entity";
import { DataSource, IsNull, Repository } from "typeorm";
import { CreatePropertyListingDto } from "../../admin/zillow-scrapper/dto/create-property-listing.dto";
import { ListForFilteringDto } from "../../admin/filtering-feature/dto/list-for-filtering.dto";
import { Market } from "src/api/entities/market.entity";
import { FilterMarketDto } from "../../admin/filtering-feature/dto/filter-market.dto";

@Injectable()
export class PropertyListingRepository extends Repository<PropertyListing> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(PropertyListing, dataSource.createEntityManager())
    }
    //active
    async filterMarket(marketId: string, filterMarketDto: FilterMarketDto): Promise<{
        properties: PropertyListing[],
        propertiesCount: number,
        limit: number,
        offset: number,
        totalPages: number,
        currentPage: number
    }> {
        const { limit, offset } = filterMarketDto
        const [properties, propertiesCount] = await this.findAndCount({
            where: { market: { id: marketId }, filtered_status: IsNull() },
            take: limit,
            skip: offset,
            select: ['id', 'photos', 'zpid', 'photoCount']
        })

        const totalPages = Math.ceil(propertiesCount / limit)
        const currentPage = Math.floor(offset / limit) + 1

        return {
            properties,
            propertiesCount,
            limit,
            offset,
            totalPages,
            currentPage
        }

    }
    //active
    async createProperty(createPropertyListingDto: CreatePropertyListingDto) {
        // Destructure properties from the DTO
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
            market,
            snapshot
        } = createPropertyListingDto;


        const zpidExist = await this.findOne({ where: { zpid } })
        if (zpidExist) {
            throw new ConflictException("User with this ZPID already exist")
        }

        // Create a new instance of PropertyListing (make sure this matches your entity)
        const property = new PropertyListing();
        property.zpid = zpid;
        property.homeStatus = home_status; // Assuming property entity has homeStatus property
        property.streetAddress = streetAddress; // Assuming property entity has streetAddress property
        property.city = city; // Assuming property entity has city property
        property.zipcode = zipcode; // Assuming property entity has zipcode property
        property.state = state; // Assuming property entity has state property
        property.bedrooms = bedrooms; // Assuming property entity has bedrooms property
        property.bathrooms = bathrooms; // Assuming property entity has bathrooms property
        property.price = price; // Assuming property entity has price property
        property.longitude = longitude; // Assuming property entity has longitude property
        property.latitude = latitude; // Assuming property entity has latitude property
        property.livingArea = livingArea; // Assuming property entity has livingArea property
        property.livingAreaUnitsShort = livingAreaUnitsShort; // Assuming property entity has livingAreaUnitsShort property
        property.homeType = homeType; // Assuming property entity has homeType property
        property.parcelId = parcelId; // Assuming property entity has parcelId property
        property.hdpTypeDimension = hdpTypeDimension; // Assuming property entity has hdpTypeDimension property
        property.photoCount = photoCount; // Assuming property entity has photoCount property
        property.photos = photos; // Assuming property entity has photos property
        property.county = county; // Assuming property entity has county property
        property.market = market;
        property.filtered_status = null;
        property.snapshot = snapshot

        // If you want to store additionalInfo, ensure your entity supports it
        if (additionalInfo) {
            property.additionalInfo = additionalInfo; // Assuming property entity has additionalInfo property
        }

        // Save the property instance to the database (implement your saving logic here)
        await this.save(property); // Assuming propertyRepository is injected and set up

        return { message: "Property created successfully", property };
    }

    //active
    async unfilteredMarket(market: Market): Promise<number> {
        const count = await this.count({ where: { market: { id: market.id }, filtered_status: IsNull() } })

        return count
    }
}