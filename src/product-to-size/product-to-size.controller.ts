import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductToSizeService } from './product-to-size.service';
import { CreateProductToSizeDto } from './dto/create-product-to-size.dto';
import { UpdateProductToSizeDto } from './dto/update-product-to-size.dto';

@Controller('product-to-size')
export class ProductToSizeController {
  constructor(private readonly productToSizeService: ProductToSizeService) {}

  @Post()
  create(@Body() createProductToSizeDto: CreateProductToSizeDto) {
    return this.productToSizeService.create(createProductToSizeDto);
  }

  @Get()
  findAll() {
    return this.productToSizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productToSizeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductToSizeDto: UpdateProductToSizeDto,
  ) {
    return this.productToSizeService.update(+id, updateProductToSizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productToSizeService.remove(+id);
  }
}
