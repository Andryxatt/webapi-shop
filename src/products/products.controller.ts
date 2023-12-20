import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Res, UseGuards, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "src/utils/multer.options";
import { Product } from "./entities/product.entity";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("files", 20, multerOptions))
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.productsService.create(createProductDto, files);
  }
  @Get("uploads/files/products/:fileId")
  async getBrand(@Param("fileId") fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: "uploads/files/products" });
  }
  @Get()
  findAll(@Query("page") page = 1, @Query("limit") limit: number, @Query("search") search?: string) {
    console.log(typeof page, typeof limit, typeof search);
    return this.productsService.findAll(Number(page), Number(limit), search);
  }
  @Get("newProducts")
  topNewProducts() {
    console.log("newProducts");
    return this.productsService.topNew();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Product> {
    return await this.productsService.findOne(+id);
  }

  @Patch(":id")
  @UseInterceptors(FilesInterceptor("files", 20, multerOptions))
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(updateProductDto);
    console.log(Number(id));
    return this.productsService.update(Number(id), updateProductDto, files);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
