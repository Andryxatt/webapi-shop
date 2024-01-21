import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, BadRequestException } from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { validate } from "class-validator";
import { unlinkSync } from "fs";
import { Brand } from "./entities/brand.entity";

@Controller("brands")
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto, @UploadedFile() file: Express.Multer.File) {
    // Validate the brand DTO
    const brand = new Brand();
    brand.name = createBrandDto.name;
    brand.description = createBrandDto.description;
    brand.iconPath = "default.png";
    const errors = await validate(brand);
    if (errors.length > 0) {
      // If validation fails, delete the uploaded file (if any) and throw a BadRequestException
      if (file) {
        unlinkSync(file.path);
      }
      throw new BadRequestException("Validation failed");
    }
    // Save the brand to the database
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
