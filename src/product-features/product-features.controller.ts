import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ProductFeaturesService } from "./product-features.service";
import { CreateProductFeatureDto } from "./dto/create-product-feature.dto";
import { UpdateProductFeatureDto } from "./dto/update-product-feature.dto";

@Controller("product-features")
export class ProductFeaturesController {
  constructor(
    private readonly productFeaturesService: ProductFeaturesService
  ) {}

  @Post()
  create(@Body() createProductFeatureDto: CreateProductFeatureDto) {
    return this.productFeaturesService.create(createProductFeatureDto);
  }

  @Get()
  findAll() {
    return this.productFeaturesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productFeaturesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductFeatureDto: UpdateProductFeatureDto
  ) {
    return this.productFeaturesService.update(+id, updateProductFeatureDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productFeaturesService.remove(+id);
  }
}
