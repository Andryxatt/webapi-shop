import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { UpdateBrandDto } from './dto/update-brand.dto';

describe('BrandsService', () => {
  let service: BrandsService;
  let repositoryMock: Repository<Brand>;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
       remove: jest.fn(), 
      update: jest.fn(),
      // Add other repository methods as needed for testing
    } as unknown as Repository<Brand>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand), // Use getRepositoryToken to mock the repository
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of brands', async () => {
      const brand: Brand = { id: 1, name: 'Test Brand', description: 'Test Description', iconPath: 'test.png', createdAt: new Date(), updatedAt: new Date() };
      const brands: Brand[] = [brand];

      jest.spyOn(repositoryMock, 'find').mockResolvedValue(brands);

      const result = await service.findAll();

      expect(result).toEqual(brands);
    });
  });
  describe('create', () => {
    it('should create a new brand', async () => {
      const createBrandDto = { name: 'Test Brand', description: 'Test Description', iconPath: 'test.png' };
      const brand: Brand = { id: 1, ...createBrandDto, createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(repositoryMock, 'save').mockResolvedValue(brand);

      const result = await service.create(createBrandDto, null);

      expect(result).toEqual(brand);
    });
  });
  describe('findOne', () => {
    it('should return a brand by id', async () => {
      const brand: Brand = { id: 1, name: 'Test Brand', description: 'Test Description', iconPath: 'test.png', createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(brand);

      const result = await service.findOne(1);

      expect(result).toEqual(brand);
    });
  });
  describe('update', () => {
    it('should update a brand by id', async () => {
      const updateBrandDto: UpdateBrandDto = { name: 'Test Brand', description: 'Test Description', iconPath: 'test.png' };
      const brand: Brand = { id: 1, ...updateBrandDto, createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(brand);
      jest.spyOn(repositoryMock, 'save').mockResolvedValue(brand);

      const result = await service.update(1, updateBrandDto, null);

      expect(result).toEqual(brand);
    });
  });
  describe('remove', () => {
      it('should remove a brand by id', async () => {
        const brand: Brand = { id: 1, name: 'Test Brand', description: 'Test Description', iconPath: 'test.png', createdAt: new Date(), updatedAt: new Date() };
  
        jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(brand);
        jest.spyOn(repositoryMock, 'remove').mockResolvedValue(brand);
  
        const result = await service.remove(1);
  
        expect(result).toEqual(brand);
      });
  });
});
