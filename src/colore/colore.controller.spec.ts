import { Test, TestingModule } from "@nestjs/testing";
import { ColoreController } from "./colore.controller";
import { ColoreService } from "./colore.service";
import { Repository, UpdateResult } from "typeorm";
import { Colore } from "./entities/colore.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateColoreDto } from "./dto/create-colore.dto";

describe("ColoreController", () => {
  let controller: ColoreController;
  let service: ColoreService;
  let repositoryMock: Repository<Colore>;
  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Colore>;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColoreController],
      providers: [
        ColoreService,
        {
          provide: getRepositoryToken(Colore),
          useValue: repositoryMock,
        },
      ],
    }).compile();
    controller = module.get<ColoreController>(ColoreController);
    service = module.get<ColoreService>(ColoreService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
  describe("create", () => {
    it("should create a new colore", async () => {
      const createColoreDto = {
        name: "Test Colore",
        hexColor: "#ffffff",
      };
      const colore = {
        id: 1,
        ...createColoreDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [],

      };
      jest.spyOn(service, "create").mockResolvedValue(colore);
      const result = await controller.create(createColoreDto);
      expect(result).toEqual(colore);
    });
  });
  describe("findAll", () => {
    it("should return an array of colores", async () => {
      const colore = {
        id: 1,
        name: "Test Colore",
        hexColor: "#ffffff",
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [],
      };
      const colores = [colore];
      jest.spyOn(service, "findAll").mockResolvedValue(colores);
      const result = await controller.findAll();
      expect(result).toEqual(colores);
    });
  });
  describe("findOne", () => {
    it("should return a colore by ID", async () => {
      const colore = {
        id: 1,
        name: "Test Colore",
        hexColor: "#ffffff",
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [],
      };
      jest.spyOn(service, "findOne").mockResolvedValue(colore);
      const result = await controller.findOne("1");
      expect(result).toEqual(colore);
    });
  });
  describe("update", () => {
    it("should update a colore", async () => {
      const updateColoreDto: CreateColoreDto = {
        name: "Test Colore",
        hexColor: "#ffffff",
      };

      // Mock UpdateResult
      const updateResult: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1, // Assuming 1 affected row for the update operation
      };

      jest.spyOn(service, "update").mockResolvedValue(updateResult);
      const result = await controller.update("1", updateColoreDto);
      expect(result).toEqual(updateResult);
    });
  });
});
