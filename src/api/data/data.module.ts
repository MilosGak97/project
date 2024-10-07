import { Module } from '@nestjs/common'; 
import { PropertyListingsModule } from './property-listings/property-listings.module';

@Module({ 
  imports: [PropertyListingsModule]
})
export class DataModule {}
