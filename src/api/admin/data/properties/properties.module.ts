import { Module } from '@nestjs/common';  
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { OnMarketController } from './on-market/on-market.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Filtering, FilteringSchema } from 'src/api/schemas/filtering-logs.schema';
import { OnMarketService } from './on-market/on-market.service';
import { PropertyListingRepository } from 'src/api/repositories/postgres/property-listing.repository';
import { FilteringRepository } from 'src/api/repositories/mongodb/filtering.repository'; 
import { OffMarketService } from './off-market/off-market.service'; 
import { CountyRepository } from 'src/api/repositories/postgres/county.repository';
import { HttpModule } from '@nestjs/axios';
import { PropertyMarketRepository } from 'src/api/repositories/postgres/property-market.repository';
import { BrightdataSnapshotRepository } from 'src/api/repositories/postgres/brightdata-snapshot.repository';

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
    PropertyMarketRepository,
    PropertyListingRepository,
    FilteringRepository, 
    BrightdataSnapshotRepository,
    CountyRepository,  
  ]
})
export class PropertiesModule {}
