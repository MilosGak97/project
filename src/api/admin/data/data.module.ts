import { Module } from '@nestjs/common'; 
import { PropertiesModule } from './properties/properties.module'; 

@Module({ 
  controllers: [],
  imports: [PropertiesModule]
})
export class DataModule {}
