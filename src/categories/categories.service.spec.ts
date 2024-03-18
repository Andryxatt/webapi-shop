import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesService } from "./categories.service";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("CategoriesService", () => {
  let service: CategoriesService;
  let repositoryMock: Repository<Category>;
  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
       remove: jest.fn(), 
      update: jest.fn(),
      // Add other repository methods as needed for testing
    } as unknown as Repository<Category>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category), // Use getRepositoryToken to mock the repository
          useValue: repositoryMock,
        },
      ],
    }).compile();
    service = module.get<CategoriesService>(CategoriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of categories", async () => {
      const category: Category = { id: 1, name: "Test Category", description: "Test Description", subCategories: [] };
      const categories: Category[] = [category];

      jest.spyOn(repositoryMock, "find").mockResolvedValue(categories);

      const result = await service.findAll();

      expect(result).toEqual(categories);
    });
  });
  describe("create", () => {
    it("should create a new category", async () => {
      const createCategoryDto = { name: "Test Category", description: "Test Description", subCategories: [] };
      const category: Category = { id: 1, ...createCategoryDto };

      jest.spyOn(repositoryMock, "save").mockResolvedValue(category);
      const result = await service.create(createCategoryDto);
      expect(result).toEqual(category);
    });
  });
  describe("findOne", () => {
    it("should return a category", async () => {
      const category: Category = { id: 1, name: "Test Category", description: "Test Description", subCategories: [] };
      jest.spyOn(repositoryMock, "findOne").mockResolvedValue(category);
      const result = await service.findOne(1);
      expect(result).toEqual(category);
    });
  });
  describe("update", () => {
    it("should update a category", async () => {
      const category: Category = { id: 1, name: "Test Category", description: "Test Description", subCategories: [] };

      jest.spyOn(repositoryMock, "findOne").mockResolvedValue(category);
      jest.spyOn(repositoryMock, "save").mockResolvedValue(category);

      const result = await service.update(1, category);

      expect(result).toEqual(category);
    });
  });
  describe("remove", () => {
    it("should remove a category", async () => {
      const category: Category = { id: 1, name: "Test Category", description: "Test Description", subCategories: [] };
      jest.spyOn(repositoryMock, "findOne").mockResolvedValue(category);
      jest.spyOn(repositoryMock, "remove").mockResolvedValue(category);
      const result = await service.remove(1);
      expect(result).toEqual(category);
    });
  });
});
