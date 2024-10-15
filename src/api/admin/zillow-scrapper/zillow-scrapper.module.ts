import { Module } from '@nestjs/common'; 
import { ZillowScrapperService } from './zillow-scrapper.service';  
import { TypeOrmModule } from '@nestjs/typeorm';   
import { HttpModule } from '@nestjs/axios';
import { ZillowScrapperSnapshot } from '../../entities/zillow-scrapper-snapshot.entity'; 
import { ZillowScrapperSnapshotRepository } from 'src/api/repositories/postgres/zillow-scrapper-snapshot.repository';
import { County } from 'src/api/entities/county.entity';
import { Market } from 'src/api/entities/market.entity';
import { MarketRepository } from 'src/api/repositories/market.repository';
import { CountyRepository } from 'src/api/repositories/county.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { PropertyListingRepository } from '../../repositories/postgres/property-listing.repository';
import { PropertyListing } from 'src/api/entities/property-listing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ZillowScrapperSnapshot,
        County,
        Market,
        PropertyListing,
      ]
    ),
    HttpModule, 
    ScheduleModule.forRoot(),
  ],
  controllers: 
  [ 
  ],
  providers: 
  [
    ZillowScrapperService, 
    ZillowScrapperSnapshotRepository, 
    MarketRepository,
    CountyRepository,
    PropertyListingRepository,
    
  ]
})
export class ZillowScrapperModule {}
