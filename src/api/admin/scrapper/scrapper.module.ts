import { Module } from '@nestjs/common';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';
import { ScrapperFunctionRepository } from './repository/scrapper-function.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapperFunction } from '../entities/scrapper-function.entity';
import { ScrapperTask } from '../entities/scrapper-task.entity';
import { ScrapperSnapshot } from '../entities/scrapper-snapshot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapperFunction, ScrapperTask, ScrapperSnapshot])],
  controllers: [ScrapperController],
  providers: [ScrapperService, ScrapperFunctionRepository]
})
export class ScrapperModule {}
