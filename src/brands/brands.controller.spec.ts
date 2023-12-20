import { Test, TestingModule } from "@nestjs/testing";
import { BrandsController } from "./brands.controller";
import { BrandsService } from "./brands.service";
import { Brand } from "./entities/brand.entity";

describe("BrandsController", () => {
  let brandsController: BrandsController;
  let brandsService: BrandsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [BrandsService],
    }).compile();

    brandsController = module.get<BrandsController>(BrandsController);
    brandsService = module.get<BrandsService>(BrandsService);
  });
  describe("findAll", () => {
    it("should return an array of brands", async () => {
      const result = new Promise<Brand[]>((resolve, reject) => resolve([]));
      jest.spyOn(brandsService, "findAll").mockImplementation(() => result);
      expect(await brandsController.findAll()).toBe(result);
    });
  });
});
