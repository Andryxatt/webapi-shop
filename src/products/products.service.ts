/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, ILike } from 'typeorm';
import { Product } from './entities/product.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { ProductToSize } from 'src/product-to-size/entities/product-to-size.entity';
import { Size } from 'src/sizes/entities/size.entity';
import * as fs from 'fs';
import { PaginationProducts } from './dto/paginationProducts';
import { Discount } from 'src/discount/entities/discount.entity';
import { ProductFeature } from '@product-features/entities/product-feature.entity';
import { Feature } from '@features/entities/feature.entity';
import { Colore } from '@colore/entities/colore.entity';
import { Seasone } from '@seasone/entities/seasone.entity';

@Injectable()
export class ProductsService {
  constructor(
    
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(ProductToSize)
    private readonly productToSizeRepository: Repository<ProductToSize>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
    @InjectRepository(ProductFeature)
    private readonly productFeatureRepository: Repository<ProductFeature>,
    @InjectRepository(Colore)
    private readonly coloreRepository: Repository<Colore>,
    @InjectRepository(Seasone)
    private readonly seasoneRepository: Repository<Seasone>,
  ) { }

  async create(
    createProductDto: CreateProductDto,
    files: Array<Express.Multer.File>,
  ) {
    const brand = await this.brandRepository.findOneBy({
      id: createProductDto.brandId,
    });
    const seasone = await this.seasoneRepository.findOneBy({
      id: createProductDto.seasoneId,
    });
    const gender = await this.brandRepository.findOneBy({
      id: createProductDto.genderId,
    });
    const discount = await this.discountRepository.findOneBy({ id: createProductDto.discountId });

    const subCategoriesIds = JSON.parse("" + createProductDto.subCategories + "");
    const subCategories = await this.subCategoryRepository.findBy({
      id: In(subCategoriesIds),
    });
    const coloresIds: Array<number> = JSON.parse("" + createProductDto.colores + "");
    const coloresAdded = await this.coloreRepository.findBy({
      id: In(coloresIds),
    });
    const product = await this.productRepository.save({
      name: createProductDto.name,
      model: createProductDto.model,
      brand: brand,
      description: createProductDto.description,
      price: createProductDto.price,
      discount: discount,
      curencyPrice: createProductDto.curencyPrice,
      subCategories: subCategories,
      gender: gender,
      seasone: seasone,
      status: createProductDto.status,
      colores: coloresAdded,
    });

    if(createProductDto.features !== null || createProductDto.features !== undefined){
      const features = JSON.parse("" + createProductDto.features + "");
      features.forEach(async (element) => {
        const productFeature = new ProductFeature();
        productFeature.feature = await this.featureRepository.findOneBy({ id: element.featureId });
        productFeature.description = element.description;
        productFeature.product = product;
        await this.productFeatureRepository.save(productFeature);
      });
    }
    if (files !== null || files !== undefined) {
      console.log(files, 'filesUploaded');
      files.forEach(async (image) => {
        console.log(image, 'image sss')
        const productImage = new ProductImage();
        productImage.imagePath = image.path;
        productImage.product = product;
        await this.productImageRepository.save(productImage);
      });
    };
    if (createProductDto.sizes !== null || createProductDto.sizes !== undefined) {
      const sizes = JSON.parse("" + createProductDto.sizes + "");
      sizes.forEach(async (element) => {
        const sizeToProduct = new ProductToSize();
        sizeToProduct.product = product;
        sizeToProduct.size = await this.sizeRepository.findOneBy({ id: element.sizeId });
        sizeToProduct.quantity = element.quantity;
        await this.productToSizeRepository.save(sizeToProduct);
      });
    }
    console.log(product, 'product');
    return product;
  }

  async findAll(page: number, limit: number, search: string): Promise<PaginationProducts> {
    const total = await this.productRepository.count();
    if(search === undefined || search === null || search === ''){
      const products = await this.productRepository.find({
        relations: ['brand', 'subCategories', 'sizes', 'images', 'discount', 'colores', 'gender', 'seasone', 'features'],
        skip: (page - 1) * limit,
        take: limit,
      });
      return { products, total };
    }
    else {
      const products = await this.productRepository.find({
        relations: ['brand', 'subCategories', 'sizes', 'images', 'discount', 'colores', 'gender', 'seasone', 'features'],
        skip: (page - 1) * limit,
        take: limit,
        where: [
          { name: ILike(`%${search}%`) },
          { model: ILike(`%${search}%`) },
          { description: ILike(`%${search}%`) },
          { brand: { name: ILike(`%${search}%`) } },
        ],
      });
      return { products, total };
    }

   
  }

  findOne(id: number): Promise<Product> {
    const product = this.productRepository.findOne({ relations: ['brand', 'subCategories', 'sizes', 'images'], where: { id: id } });
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto, files: Array<Express.Multer.File>) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['images', 'sizes', 'subCategories', 'brand']
    });
    if (!product) {
      throw new NotFoundException('Entity not found');
    }
    product.name = updateProductDto.name;
    product.model = updateProductDto.model;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.discount = await this.discountRepository.findOneBy({ id: Number(updateProductDto.discountId) });
    product.curencyPrice = updateProductDto.curencyPrice;
    product.brand = await this.brandRepository.findOneBy({ id: Number(updateProductDto.brandId) });
    const array = JSON.parse(updateProductDto.subCategories.toString()).map(Number);
    product.subCategories = await this.subCategoryRepository.findBy({
      id: In(array),
    });
    const updatedProduct = await this.productRepository.save(product);


    if (files !== null || files !== undefined) {
      files.forEach(async (image) => {
        const productImage = new ProductImage();
        productImage.imagePath = image.path;
        productImage.product = updatedProduct;
        await this.productImageRepository.save(productImage);
      });
    };
    // //TODO update product sizes
    if (updateProductDto.sizes !== null || updateProductDto.sizes !== undefined) {
      const sizes = JSON.parse("" + updateProductDto.sizes + "");
      sizes.forEach(async (element) => {
        const sizeProduct = await this.productToSizeRepository.findOneBy({ size: { id: element.sizeId }, product: { id: updatedProduct.id } });
        if (sizeProduct !== null && sizeProduct !== undefined) {
          sizeProduct.quantity = Number(element.quantity);
          await this.productToSizeRepository.save(sizeProduct);
        }
        else {
          const sizeToProduct = new ProductToSize();
          sizeToProduct.product = updatedProduct;
          sizeToProduct.size = await this.sizeRepository.findOneBy({ id: element.sizeId });
          sizeToProduct.quantity = Number(element.quantity);
          await this.productToSizeRepository.save(sizeToProduct);
        }
      });
    }
    return updatedProduct;
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['images']
    });
    product.images.forEach((image) => {
      fs.unlink(image.imagePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
    return this.productRepository.delete(id);
  }
  async topNew(): Promise<PaginationProducts> {
    const products = await this.productRepository.find({
      relations: ['brand', 'subCategories', 'sizes', 'images', 'discount', 'colores', 'features', 'features.feature'],
      order: {
        createdAt: 'DESC',
      },
    });
    return { products, total: products.length };
  }
}
