import { Injectable } from '@nestjs/common';
import { CreateProductToSizeDto } from './dto/create-product-to-size.dto';
import { UpdateProductToSizeDto } from './dto/update-product-to-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductToSize } from './entities/product-to-size.entity';

@Injectable()
export class ProductToSizeService {
  constructor(
    @InjectRepository(ProductToSize)
    private readonly productToSizeRepository: Repository<ProductToSize>,
  ) {}
  create(
    createProductToSizeDto: CreateProductToSizeDto,
  ): Promise<ProductToSize> {
    return this.productToSizeRepository.save(createProductToSizeDto);
  }

  findAll(): Promise<ProductToSize[]> {
    return this.productToSizeRepository.find();
  }

  findOne(id: number): Promise<ProductToSize> {
    return this.productToSizeRepository.findOneBy({ id: id });
  }

  update(id: number, updateProductToSizeDto: UpdateProductToSizeDto) {
    return this.productToSizeRepository.update(id, updateProductToSizeDto);
  }

  remove(id: number) {
    return this.productToSizeRepository.delete(id);
  }
}
