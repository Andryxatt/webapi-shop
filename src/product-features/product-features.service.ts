import { Injectable } from "@nestjs/common";
import { CreateProductFeatureDto } from "./dto/create-product-feature.dto";
import { UpdateProductFeatureDto } from "./dto/update-product-feature.dto";
import { ProductFeature } from "./entities/product-feature.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductFeaturesService {
  constructor(
    @InjectRepository(ProductFeature)
    private readonly productRepository: Repository<ProductFeature>
  ) {}
  create(createProductFeatureDto: CreateProductFeatureDto) {
    return this.productRepository.save(createProductFeatureDto);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id: id });
  }

  update(id: number, updateProductFeatureDto: UpdateProductFeatureDto) {
    return this.productRepository.update(id, updateProductFeatureDto);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
