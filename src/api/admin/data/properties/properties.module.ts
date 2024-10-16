import { Module } from '@nestjs/common';  
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { OnMarketController } from './on-market/on-market.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Filtering, FilteringSchema } from 'src/api/schemas/filtering-logs.schema';
import { OnMarketService } from './on-market/on-market.service';
import { MarketRepository } from 'src/api/repositories/market.repository';
import { PropertyListingRepository } from 'src/api/repositories/postgres/property-listing.repository';
import { FilteringRepository } from 'src/api/repositories/mongodb/filtering.repository'; 
import { OffMarketService } from './off-market/off-market.service';
import { ZillowScrapperSnapshotRepository } from 'src/api/repositories/postgres/zillow-scrapper-snapshot.repository'; 
import { CountyRepository } from 'src/api/repositories/county.repository';
import { HttpModule } from '@nestjs/axios';

@Module({ 
  controllers: [
    PropertiesController, 
    OnMarketController
  ],
  imports: [ 
    MongooseModule.forFeature([
      {name: Filtering.name, schema: FilteringSchema}
    ]),
    HttpModule, 
  ],
  providers:[
    PropertiesService,
    OnMarketService,
    OffMarketService,
    MarketRepository,
    PropertyListingRepository,
    FilteringRepository, 
    ZillowScrapperSnapshotRepository, 
    CountyRepository,  
  ]
})
export class PropertiesModule {}
