import { Module } from '@nestjs/common'; 
import { ZillowScrapperService } from './zillow-scrapper.service';  
import { TypeOrmModule } from '@nestjs/typeorm';   
import { HttpModule } from '@nestjs/axios';
import { ZillowScrapperSnapshot } from '../../entities/zillow-scrapper-snapshot.entity';
import { ZillowScrapperController } from './zillow-scrapper.controller';
import { ZillowScrapperSnapshotRepository } from './repository/zillow-scrapper-snapshot.repository'; 
import { County } from 'src/api/entities/county.entity';
import { Market } from 'src/api/entities/market.entity';
import { MarketRepository } from 'src/api/repositories/market.repository';
import { CountyRepository } from 'src/api/repositories/county.repository'; 
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ZillowScrapperSnapshot,
        County,
        Market
      ]
    ),
    HttpModule, 
    ScheduleModule.forRoot(),
  ],
  controllers: 
  [
    ZillowScrapperController,
  ],
  providers: 
  [
    ZillowScrapperService, 
    ZillowScrapperSnapshotRepository, 
    MarketRepository,
    CountyRepository,
    
  ]
})
export class ZillowScrapperModule {}
