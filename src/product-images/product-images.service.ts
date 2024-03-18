import { Injectable } from "@nestjs/common";
import { CreateProductImageDto } from "./dto/create-product-image.dto";
import { UpdateProductImageDto } from "./dto/update-product-image.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductImage } from "./entities/product-image.entity";
import * as fs from "fs";
@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>
  ) {}
  create(createProductImageDto: CreateProductImageDto): Promise<ProductImage> {
    return this.productImageRepository.save(createProductImageDto);
  }

  findAll(): Promise<ProductImage[]> {
    return this.productImageRepository.find();
  }

  findOne(id: number): Promise<ProductImage> {
    return this.productImageRepository.findOneBy({ id: id });
  }

  update(id: number, updateProductImageDto: UpdateProductImageDto) {
    return this.productImageRepository.update(id, updateProductImageDto);
  }

  async remove(id: number) {
    const image = this.productImageRepository.findOneBy({ id: id });
    fs.unlink((await image).imagePath, (err) => {
      if (err) {
        console.error(err);
      }
    });
    return this.productImageRepository.delete(id);
  }
}
