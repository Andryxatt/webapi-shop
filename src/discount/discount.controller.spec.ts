import { Test, TestingModule } from "@nestjs/testing";
import { DiscountController } from "./discount.controller";
import { DiscountService } from "./discount.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { Discount } from "./entities/discount.entity";
import { UpdateResult } from "typeorm";

describe("DiscountController", () => {
  let discountController: DiscountController;
  let discountService: DiscountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountController],
      providers: [DiscountService],
    }).compile();

    discountController = module.get<DiscountController>(DiscountController);
    discountService = module.get<DiscountService>(DiscountService);
  });

  it("should be defined", () => {
    expect(discountController).toBeDefined();
  });

  describe("create", () => {
    it("should create a discount", async () => {
      const createDiscountDto: CreateDiscountDto = {
        percentage: 10,
      };
      const expectedResult: Discount = {
        id: 1,
        percentage: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [],
      };

      jest.spyOn(discountService, "create").mockResolvedValue(expectedResult);

      const result = await discountController.create(createDiscountDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("findAll", () => {
    it("should return an array of discounts", async () => {
      const expectedResult: Discount[] = [
        {
          id: 1,
          percentage: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
          products: [],
        },
      ];

      jest.spyOn(discountService, "findAll").mockResolvedValue(expectedResult);

      const result = await discountController.findAll();
      expect(result).toBe(expectedResult);
    });
  });

  describe("findOne", () => {
    it("should return a discount by ID", async () => {
      const discountId = "1";
      const expectedResult: Discount = {
        id: 1,
        percentage: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [],
      };

      jest.spyOn(discountService, "findOne").mockResolvedValue(expectedResult);

      const result = await discountController.findOne(discountId);
      expect(result).toBe(expectedResult);
    });
  });

  describe("update", () => {
    it("should update a discount", async () => {
      const discountId = "1";
      const updateDiscountDto: UpdateDiscountDto = {
        percentage: 15,
      };
      const expectedResult: UpdateResult = {
        raw: [],
        generatedMaps: [],
        affected: 1,
      };

      jest.spyOn(discountService, "update").mockResolvedValue(expectedResult);

      const result = await discountController.update(
        discountId,
        updateDiscountDto
      );
      expect(result).toBe(expectedResult);
    });
  });

  describe("remove", () => {
    it("should delete a discount by ID", async () => {
      const discountId = "1";
      const expectedResult = { raw: [], affected: 1 };

      jest.spyOn(discountService, "remove").mockResolvedValue(expectedResult);

      const result = await discountController.remove(discountId);
      expect(result).toBe(expectedResult);
    });
  });
});
