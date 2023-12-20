import { Test, TestingModule } from '@nestjs/testing';
import { SeasoneController } from './seasone.controller';
import { SeasoneService } from './seasone.service';

describe('SeasoneController', () => {
  let controller: SeasoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeasoneController],
      providers: [SeasoneService],
    }).compile();

    controller = module.get<SeasoneController>(SeasoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
