import { Test, TestingModule } from '@nestjs/testing';
import { ColoreService } from './colore.service';

describe('ColoreService', () => {
  let service: ColoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColoreService],
    }).compile();

    service = module.get<ColoreService>(ColoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
