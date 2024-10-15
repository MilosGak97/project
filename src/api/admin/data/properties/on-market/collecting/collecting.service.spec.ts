import { Test, TestingModule } from '@nestjs/testing';
import { CollectingService } from './collecting.service';

describe('CollectingService', () => {
  let service: CollectingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectingService],
    }).compile();

    service = module.get<CollectingService>(CollectingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
