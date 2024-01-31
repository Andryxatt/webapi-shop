import { Test, TestingModule } from "@nestjs/testing";
import { BrandsController } from "./brands.controller";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { DeleteResult } from "typeorm";
describe("BrandsController", () => {
  let brandsController: BrandsController;
  let brandsService: BrandsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        BrandsService,
        {
          provide: "BrandRepository",
          useValue: mockRepository,
        },
      ],
    }).compile();

    brandsController = module.get<BrandsController>(BrandsController);
    brandsService = module.get<BrandsService>(BrandsService);
  });
  it("should be defined", () => {
    expect(brandsController).toBeDefined();
  });
  describe("create", () => {
    it("should create a new brand", async () => {
      const createBrandDto: CreateBrandDto = {
        name: "Test Brand",
        description: "Test Description",
        iconPath: "default.png",
      };

      jest.spyOn(brandsService, "create").mockResolvedValueOnce(mockBrands[0]); // mock the service method

      const result = await brandsController.create(createBrandDto, null);

      expect(result).toEqual(mockBrands[0]);
    });
  });
  describe("findAll", () => {
    it("should return an array of brands", async () => {
      jest.spyOn(brandsService, "findAll").mockResolvedValueOnce(mockBrands); // mock the service method

      const result = await brandsController.findAll();

      expect(result).toEqual(mockBrands);
    });
  });

  describe("findOne", () => {
    it("should return a brand by id", async () => {
      const brandId = 1;

      jest.spyOn(brandsService, "findOne").mockResolvedValueOnce(mockBrands[0]); // mock the service method

      const result = await brandsController.findOne(brandId);

      expect(result).toEqual(mockBrands[0]);
    });
  });

  describe("update", () => {
    it("should update a brand", async () => {
      const brandId = 1;
      const updateBrandDto: CreateBrandDto = {
        name: "Test Brand",
        description: "Test Description",
        iconPath: "default.png",
      };

      jest.spyOn(brandsService, "update").mockResolvedValueOnce(mockBrands[0]); // mock the service method

      const result = await brandsController.update(brandId, updateBrandDto, null);

      expect(result).toEqual(mockBrands[0]);
    });
  });
  describe("remove", () => {
    it("should remove a brand by id", async () => {
      const brandId = 1;

      jest.spyOn(brandsService, "remove").mockResolvedValueOnce({} as DeleteResult);

      const result = await brandsController.remove(brandId);

      expect(result).toEqual({}); // You may adjust this expectation based on your actual implementation
      expect(brandsService.remove).toHaveBeenCalledWith(brandId);
    });

    it("should handle errors during the remove", async () => {
      const brandId = 1;

      jest.spyOn(brandsService, "remove").mockRejectedValueOnce(new Error("Remove failed"));

      await expect(brandsController.remove(brandId)).rejects.toThrowError("Remove failed");
      expect(brandsService.remove).toHaveBeenCalledWith(brandId);
    });
  });
  // Mock repository and data for testing

  afterEach(() => {
    jest.clearAllMocks();
  });
});
export const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const mockBrands = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Test Brand",
    iconPath: "/uploads/default-brand-icon.png",
    description: "Test Description",
    products: [],
  },
  {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Test Brand 2",
    iconPath: "/uploads/default-brand-icon.png",
    description: "Test Description 2",
    products: [],
  },
];
