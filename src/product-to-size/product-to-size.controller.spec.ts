import { Test, TestingModule } from "@nestjs/testing";
import { ProductToSizeController } from "./product-to-size.controller";
import { ProductToSizeService } from "./product-to-size.service";

describe("ProductToSizeController", () => {
  let controller: ProductToSizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductToSizeController],
      providers: [ProductToSizeService],
    }).compile();

    controller = module.get<ProductToSizeController>(ProductToSizeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
