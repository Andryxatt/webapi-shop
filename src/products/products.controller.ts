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
  UploadedFile,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Product } from "./entities/product.entity";
import * as xlsx from 'xlsx';
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseInterceptors(FilesInterceptor("files"))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.productsService.create(createProductDto, files);
  }
  @Post("upload-excel")
  @UseInterceptors(FileInterceptor("file"))
  uploadExcel(@UploadedFile() file: Express.Multer.File) {
    try {
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0]; // Assuming there is only one sheet
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
      return this.productsService.createManyFromFile(data);
    } catch (error) {
      console.error('Error processing file:', error);
      return { success: false, message: 'Error processing file' };
    }
  }
  @Post("upload-image")
  @UseInterceptors(FilesInterceptor("files"))
  uploadImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return this.productsService.uploadPhotosMany(files);
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
    return this.productsService.likeProduct(id);
  }
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Patch(":id")
  @UseInterceptors(FilesInterceptor("files"))
  update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.productsService.update(id, updateProductDto, files);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(id);
  }
}
