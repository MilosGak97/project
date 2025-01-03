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
import { BrightdataSnapshotRepository } from 'src/api/repositories/postgres/brightdata-snapshot.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StateRepository } from 'src/api/repositories/postgres/state.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyListing } from 'src/api/entities/property-listing.entity';
import { BrightdataSnapshot } from 'src/api/entities/brightdata-snapshot.entity';
import { State } from 'src/api/entities/state.entity';
import { County } from 'src/api/entities/county.entity';
import { ListingsLA, ListingsLASchema } from 'src/api/schemas/listingsLA.schema'; 
import { ListingsLARepository } from 'src/api/repositories/mongodb/listingsLA.repository';
import { User } from '../../../entities/user.entity';
import { Company } from '../../../entities/company.entity';

@Module({ 
  controllers: [
    PropertiesController, 
    OnMarketController
  ],
  imports: [  
    TypeOrmModule.forFeature([PropertyListing, BrightdataSnapshot,State, County]),
    MongooseModule.forFeature([
      {name: Filtering.name, schema: FilteringSchema} , {name: ListingsLA.name, schema: ListingsLASchema}
    ]),
    HttpModule, 
    JwtModule.register({secret: 'topSecret51'}),
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  providers:[
    PropertiesService,
    OnMarketService,
    OffMarketService,
    PropertyListingRepository,
    FilteringRepository,
    ListingsLARepository,
    BrightdataSnapshotRepository,
    CountyRepository,  
    StateRepository,
  ]
})
export class PropertiesModule {}
