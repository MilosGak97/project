import { Module } from '@nestjs/common';
import { FilteringFeatureService } from './filtering-feature.service'; 
import { MongooseModule } from '@nestjs/mongoose';
import { Filtering, FilteringSchema } from 'src/api/schemas/filtering-logs.schema';
import { PropertyListingRepository } from '../../repositories/postgres/property-listing.repository';
import { FilteringRepository } from '../../repositories/mongodb/filtering.repository';
import { MarketRepository } from 'src/api/repositories/market.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Filtering.name, schema: FilteringSchema}
    ])
  ],
  providers: [
    FilteringFeatureService,
    PropertyListingRepository,
    FilteringRepository,
    MarketRepository,
  ],
  controllers: [ ]
})
export class FilteringFeatureModule {}
