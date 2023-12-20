import { Test, TestingModule } from '@nestjs/testing';
import { ProductToSizeService } from './product-to-size.service';

describe('ProductToSizeService', () => {
  let service: ProductToSizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductToSizeService],
    }).compile();

    service = module.get<ProductToSizeService>(ProductToSizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
