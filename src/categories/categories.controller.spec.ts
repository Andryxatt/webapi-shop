import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("CategoriesController", () => {
  let controller: CategoriesController;
  let service: CategoriesService;
  let repositoryMock: Repository<Category>;
  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Category>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: repositoryMock,
        },
      ],
    }).compile();
    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto = { name: 'Test Category', description: 'Test Description', subCategories: [] };
      const category: Category = { id: 1, ...createCategoryDto};

      jest.spyOn(service, 'create').mockResolvedValue(category);

      const result = await controller.create(createCategoryDto);

      expect(result).toEqual(category);
    });
  });
  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const category: Category = { id: 1, name: 'Test Category', description: 'Test Description', subCategories: [] };
      const categories: Category[] = [category];

      jest.spyOn(service, 'findAll').mockResolvedValue(categories);

      const result = await controller.findAll();

      expect(result).toEqual(categories);
    });
  });
  describe('findOne', () => {
    it('should return a category', async () => {
      const category: Category = { id: 1, name: 'Test Category', description: 'Test Description', subCategories: [] };

      jest.spyOn(service, 'findOne').mockResolvedValue(category);

      const result = await controller.findOne('1');

      expect(result).toEqual(category);
    });
  });
  describe('update', () => {
    it('should update a category', async () => {
      const updateCategoryDto = { name: 'Test Category', description: 'Test Description', subCategories: [] };
      const category: Category = { id: 1, ...updateCategoryDto };

      jest.spyOn(service, 'update').mockResolvedValue(category);

      const result = await controller.update('1', updateCategoryDto);

      expect(result).toEqual(category);
    });
  });
  describe('remove', () => {
    it('should delete a category', async () => {
      const category: Category = { id: 1, name: 'Test Category', description: 'Test Description', subCategories: [] };

      jest.spyOn(service, 'remove').mockResolvedValue(category);

      const result = await controller.remove('1');

      expect(result).toEqual(category);
    });
  });
});
