import { Test, TestingModule } from "@nestjs/testing";
import { BrandsService } from "./brands.service";
import { Brand } from "./entities/brand.entity";
import { Repository, DeleteResult } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { mockBrands, mockRepository } from "./brands.controller.spec";
import { CreateBrandDto } from "./dto/create-brand.dto";
describe("BrandsService", () => {
  let service: BrandsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Brand>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    repository = module.get<Repository<Brand>>(getRepositoryToken(Brand));
  });
  describe("create", () => {
    it("should create a brand with valid data", async () => {
      const createBrandDto: CreateBrandDto = {
        name: "Test Brand",
        description: "Test Description",
        iconPath: "test-icon.png",
      };
      const fileMock = { path: "test-icon.png" };

      jest.spyOn(repository, "save").mockResolvedValueOnce(mockBrands[0]);

      const result = await service.create(createBrandDto, fileMock);

      expect(result).toEqual(mockBrands[0]);
      expect(repository.save).toHaveBeenCalledWith(expect.any(Brand));
    });

    it("should handle errors during brand creation", async () => {
      const createBrandDto: CreateBrandDto = {
        name: "Test Brand",
        description: "Test Description",
        iconPath: "/uploads/test-icon.png",
      };
      const fileMock = { path: "/uploads/test-icon.png" };

      jest.spyOn(repository, "save").mockRejectedValueOnce(new Error("Save failed"));

      await expect(service.create(createBrandDto, fileMock)).rejects.toThrowError("Save failed");
      expect(repository.save).toHaveBeenCalledWith(expect.any(Brand));
    });
  });
  describe("findAll", () => {
    it("should return an array of brands", async () => {
      jest.spyOn(repository, "find").mockResolvedValueOnce(mockBrands);

      const result = await service.findAll();

      expect(result).toEqual(mockBrands);
      expect(repository.find).toHaveBeenCalled();
    });
  });
  describe("findOne", () => {
    it("should return a brand", async () => {
      jest.spyOn(repository, "findOne").mockResolvedValueOnce(mockBrands[0]);

      const result = await service.findOne(1);

      expect(result).toEqual(mockBrands[0]);
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });
  });
  describe("update", () => {
    it("should update a brand", async () => {
      const createBrandDto: CreateBrandDto = {
        name: "Test Brand",
        description: "Test Description",
        iconPath: "/uploads/test-icon.png",
      };
      const fileMock = { path: "/uploads/test-icon.png" };

      jest.spyOn(repository, "save").mockResolvedValueOnce(mockBrands[0]);
      jest.spyOn(repository, "findOne").mockResolvedValueOnce(mockBrands[0]);

      const result = await service.update(1, createBrandDto, fileMock);

      expect(result).toEqual(mockBrands[0]);
      expect(repository.save).toHaveBeenCalledWith(expect.any(Brand));
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });
    it("should handle errors during brand update", async () => {
      const createBrandDto: CreateBrandDto = {
        name: "Test Brand",
        description: "Test Description",
        iconPath: "/uploads/test-icon.png",
      };
      const fileMock = { path: "/uploads/test-icon.png" };

      jest.spyOn(repository, "save").mockRejectedValueOnce(new Error("Save failed"));
      jest.spyOn(repository, "findOne").mockResolvedValueOnce(mockBrands[0]);

      await expect(service.update(1, createBrandDto, fileMock)).rejects.toThrowError("Save failed");
      expect(repository.save).toHaveBeenCalledWith(expect.any(Brand));
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });
  });
  describe("remove", () => {
    it("should remove a brand", async () => {
      const deleteResult: DeleteResult = { affected: 1, raw: {} }; // Provide the expected structure

      jest.spyOn(repository, "delete").mockResolvedValueOnce(deleteResult);

      const result = await service.remove(1);

      expect(result).toEqual(deleteResult);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it("should handle errors during brand removal", async () => {
      jest.spyOn(repository, "delete").mockRejectedValueOnce(new Error("Delete failed"));

      await expect(service.remove(1)).rejects.toThrowError("Delete failed");
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
