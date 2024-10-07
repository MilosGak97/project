import { Module } from '@nestjs/common';
import { MarketManagementService } from './market-management.service';
import { MarketManagementController } from './market-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from 'src/api/entities/market.entity';
import { County } from 'src/api/entities/county.entity';
import { MarketRepository } from 'src/api/repositories/market.repository';
import { CountyRepository } from 'src/api/repositories/county.repository';

@Module({
  imports: 
  [
    TypeOrmModule.forFeature([Market,County]),
  ],
  providers: [
    MarketManagementService, 
    MarketRepository,
    CountyRepository
  ],
  controllers: [
    MarketManagementController
  ]
})
export class MarketManagementModule {}
