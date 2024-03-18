import { Test, TestingModule } from "@nestjs/testing";
import { ColoreController } from "./colore.controller";
import { ColoreService } from "./colore.service";

describe("ColoreController", () => {
  let controller: ColoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColoreController],
      providers: [ColoreService],
    }).compile();

    controller = module.get<ColoreController>(ColoreController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
