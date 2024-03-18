import { Test, TestingModule } from "@nestjs/testing";
import { SeasoneService } from "./seasone.service";

describe("SeasoneService", () => {
  let service: SeasoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasoneService],
    }).compile();

    service = module.get<SeasoneService>(SeasoneService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
