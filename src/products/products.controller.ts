/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
  Query,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "src/utils/multer.options";
import { Product } from "./entities/product.entity";
// import * as multerGoogleStorage from "multer-google-storage";
// import { v4 as uuid } from "uuid";
// import { extname } from "path";
// import shop_info_config from "../shop-info-config.json";
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("files"))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.productsService.create(createProductDto, files);
  }
  @Get("uploads/files/products/:fileId")
  async getBrand(@Param("fileId") fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: "uploads/files/products" });
  }
  @Get()
  findAll(@Query("findProductsDto") findProductsDto: any) {
    return this.productsService.findAll(findProductsDto);
  }
  @Get("newProducts")
  topNewProducts() {
    return this.productsService.topNew();
  }
  @Post("like/:id")
  like(@Param("id") id: string) {
    return this.productsService.likeProduct(+id);
  }
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Product> {
    return await this.productsService.findOne(+id);
  }

  @Patch(":id")
  @UseInterceptors(FilesInterceptor("files", 20, multerOptions))
  update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.productsService.update(Number(id), updateProductDto, files);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
