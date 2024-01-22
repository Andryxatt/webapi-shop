import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, BadRequestException } from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { validate } from "class-validator";
import { Brand } from "./entities/brand.entity";
@Controller("brands")
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/files/brands",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async create(@Body() createBrandDto: CreateBrandDto, @UploadedFile() file: Express.Multer.File) {
    console.log("response", file, createBrandDto);
    // Validate the brand DTO
    const brand = new Brand();
    brand.name = createBrandDto.name;
    brand.description = createBrandDto.description;
    brand.iconPath = "default.png";
    const errors = await validate(brand);
    console.log("errors", errors);

    return this.brandsService.create(createBrandDto, file);
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.brandsService.findOne(id);
  }
  @Get("uploads/files/brands/:fileId")
  async getBrand(@Param("fileId") fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: "uploads/files/brands" });
  }
  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/files/brands",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  update(@Param("id") id: number, @Body() updateBrandDto: UpdateBrandDto, @UploadedFile() file) {
    return this.brandsService.update(id, updateBrandDto, file);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.brandsService.remove(id);
  }
}
