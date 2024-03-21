import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from '../brands/brands.controller';
import { BrandsService } from '../brands/brands.service';
import { CreateBrandDto } from '../brands/dto/create-brand.dto';
import { Brand } from '../brands/entities/brand.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: BrandsService;
  let repositoryMock: Repository<Brand>;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      // Add other repository methods as needed for testing
    } as unknown as Repository<Brand>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand), // Use getRepositoryToken to mock the repository
          useValue: repositoryMock,
        },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a new brand', async () => {
      const createBrandDto: CreateBrandDto = { name: 'Test Brand', description: 'Test Description', iconPath: 'test.png' };
      const brand: Brand = { id: 1, ...createBrandDto, createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(service, 'create').mockResolvedValue(brand);

      const result = await controller.create(createBrandDto, null);

      expect(result).toEqual(brand);
    });
  });
  describe('findAll', () => {
    it('should return an array of brands', async () => {
      const brand: Brand = { id: 1, name: 'Test Brand', description: 'Test Description', iconPath: 'test.png', createdAt: new Date(), updatedAt: new Date() };
      const brands: Brand[] = [brand];

      jest.spyOn(service, 'findAll').mockResolvedValue(brands);

      const result = await controller.findAll();

      expect(result).toEqual(brands);
    });
  });
  describe('findOne', () => {
    it('should return a brand by ID', async () => {
      const brand: Brand = { id: 1, name: 'Test Brand', description: 'Test Description', iconPath: 'test.png', createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(service, 'findOne').mockResolvedValue(brand);

      const result = await controller.findOne(1);

      expect(result).toEqual(brand);
    });
  });
  describe('update', () => {
    it('should update a brand by ID', async () => {
      const updateBrandDto: CreateBrandDto = { name: 'Test Brand', description: 'Test Description', iconPath: 'test.png' };
      const brand: Brand = { id: 1, ...updateBrandDto, createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(service, 'update').mockResolvedValue(brand);

      const result = await controller.update(1, updateBrandDto, null);

      expect(result).toEqual(brand);
    });
  });
  describe('remove', () => {
    it('should remove a brand by ID', async () => {
      const brand: Brand = { id: 1, name: 'Test Brand', description: 'Test Description', iconPath: 'test.png', createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(service, 'remove').mockResolvedValue(brand);

      const result = await controller.remove(1);

      expect(result).toEqual(brand);
    });
  });
});
