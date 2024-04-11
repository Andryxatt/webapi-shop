/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, ILike, In, Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { Brand } from "../brands/entities/brand.entity";
import { SubCategory } from "../sub-categories/entities/sub-category.entity";
import { ProductImage } from "../product-images/entities/product-image.entity";
import { ProductToSize } from "../product-to-size/entities/product-to-size.entity";
import { Size } from "../sizes/entities/size.entity";
import { PaginationProducts } from "./dto/paginationProducts";
import { Discount } from "../discount/entities/discount.entity";
import { ProductFeature } from "@product-features/entities/product-feature.entity";
import { Feature } from "@features/entities/feature.entity";
import { Colore } from "@colore/entities/colore.entity";
import { Seasone } from "@seasone/entities/seasone.entity";
import * as fs from "fs";
import sharp from "sharp";
import { extname } from "path";
import { writeFile } from 'fs/promises';
import { v4 as uuid } from "uuid";
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
    private readonly seasoneRepository: Repository<Seasone>
  ) { }

  async create(
    createProductDto: CreateProductDto,
    files: Array<Express.Multer.File>
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
    const discount = await this.discountRepository.findOneBy({
      id: createProductDto.discountId,
    });

    const subCategoriesIds = JSON.parse(
      "" + createProductDto.subCategories + ""
    );
    const subCategories = await this.subCategoryRepository.findBy({
      id: In(subCategoriesIds),
    });
    const coloresIds: Array<number> = JSON.parse(
      "" + createProductDto.colores + ""
    );
    const coloresAdded = await this.coloreRepository.findBy({
      id: In(coloresIds),
    });
    const product = await this.productRepository.save({
      name: createProductDto.name,
      model: createProductDto.model,
      brand: brand || null,
      description: createProductDto.description || "",
      price: createProductDto.price,
      discount: discount || null,
      curencyPrice: createProductDto.curencyPrice,
      subCategories: subCategories || null,
      gender: gender || null,
      seasone: seasone || null,
      status: createProductDto.status || "новий",
      colores: coloresAdded || null,
    });

    if (
      createProductDto.features !== null ||
      createProductDto.features !== undefined
    ) {
      const features = JSON.parse("" + createProductDto.features + "");
      features.forEach(async (element) => {
        const productFeature = new ProductFeature();
        productFeature.feature = await this.featureRepository.findOneBy({
          id: element.featureId,
        });
        productFeature.description = element.description;
        productFeature.product = product;
        await this.productFeatureRepository.save(productFeature);
      });
    }
    if (files !== null || files !== undefined) {
      const optimizedFileNames = await this.optimizeAndSaveImage(files);
      optimizedFileNames.forEach(async (image) => {
        const productImage = new ProductImage();
        productImage.imagePath = image.imagePath;
        productImage.product = product;
        await this.productImageRepository.save(productImage);
      });
    }
    if (
      createProductDto.sizes !== null ||
      createProductDto.sizes !== undefined
    ) {
      const sizes = JSON.parse("" + createProductDto.sizes + "");
      sizes.forEach(async (element) => {
        const sizeToProduct = new ProductToSize();
        sizeToProduct.product = product;
        sizeToProduct.size = await this.sizeRepository.findOneBy({
          id: element.sizeId,
        });
        sizeToProduct.quantity = element.quantity;
        await this.productToSizeRepository.save(sizeToProduct);
      });
    }
    return product;
  }

  async findAll(findProductsDto?: any): Promise<PaginationProducts> {


    const queryBuilder = this.productRepository.createQueryBuilder('product')
    if (findProductsDto !== undefined) {
      const jsonFilters = JSON.parse(findProductsDto);
      const whereCondition: Record<string, any>[] = [];
      if (
        jsonFilters.minPrice !== undefined &&
        jsonFilters.maxPrice !== undefined
      ) {
        const minPrice = parseInt(jsonFilters.minPrice);
        const maxPrice = parseInt(jsonFilters.maxPrice);
        queryBuilder.where('product.price BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice });
      }
      if (jsonFilters.search) {
        const searchConditionName = { name: ILike(`%${jsonFilters.search}%`)};
        const searchConditionModel = { model: ILike(`%${jsonFilters.search}%`)};
        queryBuilder.andWhere(new Brackets(qb => {
          qb.where(searchConditionName).orWhere(searchConditionModel);
        }));
      }
      if (jsonFilters.brands && jsonFilters.brands.length > 0) {
        const brandCondition = { brand: In(jsonFilters.brands) };
        queryBuilder.andWhere(brandCondition);
      }
      if (
        jsonFilters.categories?.length > 0 &&
        jsonFilters.subCategories?.length === 0
      ) {
        const catConditions = {
          subCategories: {
            category: In(jsonFilters.categories),
          },
        };
        queryBuilder.andWhere(catConditions);
      } else if (
        jsonFilters.subCategories &&
        jsonFilters.subCategories.length > 0
      ) {
        const subConditions = {
          subCategories: {
            id: In(jsonFilters.subCategories),
          },
        };
        queryBuilder.andWhere(subConditions);
      }
      if (jsonFilters.colores && jsonFilters.colores.length > 0) {
        const coloresCondition = {
          colores: {
            id: In(jsonFilters.colores),
          },
        };
        queryBuilder.andWhere(coloresCondition);
      }
      queryBuilder.leftJoinAndSelect("product.brand", "brand");
      queryBuilder.leftJoinAndSelect("product.subCategories", "subCategories");
      queryBuilder.leftJoinAndSelect("product.sizes", "sizes");
      queryBuilder.leftJoinAndSelect("product.images", "images");
      queryBuilder.leftJoinAndSelect("product.discount", "discount");
      queryBuilder.leftJoinAndSelect("product.colores", "colores");
      queryBuilder.leftJoinAndSelect("product.features", "features");
      const products = await queryBuilder.take(jsonFilters.limit).getMany();
      const total = await this.productRepository.count();
      return {
        products,
        total
      };
    }
    else {
      const products = await this.productRepository.find({
        relations: [
          "brand",
          "subCategories",
          "sizes",
          "images",
          "discount",
          "colores",
          "features",
          "features.feature",
        ],
        order: {
          createdAt: "DESC",
        },
      });
      return {
        products,
        total: products.length,
      };
    }
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      relations: ["brand", "subCategories", "sizes", "images"],
      where: { id: id },
    });
    return product;
  }

  async likeProduct(id: string): Promise<Product> {
    const product = this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException("Entity not found");
    }
    product.then((product) => {
      product.likes += 1;
      this.productRepository.save(product);
    });
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    files: Array<Express.Multer.File>
  ) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ["images", "sizes", "subCategories", "brand"],
    });
    if (!product) {
      0;
      throw new NotFoundException("Entity not found");
    }
    product.name = updateProductDto.name;
    product.model = updateProductDto.model;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.discount = await this.discountRepository.findOneBy({
      id: Number(updateProductDto.discountId),
    });
    product.curencyPrice = updateProductDto.curencyPrice;
    product.brand = await this.brandRepository.findOneBy({
      id: Number(updateProductDto.brandId),
    });
    const array = JSON.parse(updateProductDto.subCategories.toString()).map(
      Number
    );
    product.subCategories = await this.subCategoryRepository.findBy({
      id: In(array),
    });
    const updatedProduct = await this.productRepository.save(product);
      const optimizedFileNames = await this.optimizeAndSaveImage(files);
      optimizedFileNames.forEach(async (image) => {
        const productImage = new ProductImage();
        productImage.imagePath = image.imagePath;
        productImage.product = product;
        await this.productImageRepository.save(productImage);
    });
    // //TODO update product sizes
    if (
      updateProductDto.sizes !== null ||
      updateProductDto.sizes !== undefined
    ) {
      const sizes = JSON.parse("" + updateProductDto.sizes + "");
      sizes.forEach(async (element) => {
        const sizeProduct = await this.productToSizeRepository.findOneBy({
          size: { id: element.sizeId },
          product: { id: updatedProduct.id },
        });
        if (sizeProduct !== null && sizeProduct !== undefined) {
          sizeProduct.quantity = Number(element.quantity);
          await this.productToSizeRepository.save(sizeProduct);
        } else {
          const sizeToProduct = new ProductToSize();
          sizeToProduct.product = updatedProduct;
          sizeToProduct.size = await this.sizeRepository.findOneBy({
            id: element.sizeId,
          });
          sizeToProduct.quantity = Number(element.quantity);
          await this.productToSizeRepository.save(sizeToProduct);
        }
      });
    }
    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ["images"],
    });
    product.images.forEach((image) => {
      fs.unlink(`./uploads/files/products/${image.imagePath}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
    return this.productRepository.delete(id);
  }
  async topNew(): Promise<PaginationProducts> {
    const products = await this.productRepository.find({
      relations: [
        "brand",
        "subCategories",
        "sizes",
        "images",
        "discount",
        "colores",
        "features",
        "features.feature",
      ],
      order: {
        createdAt: "DESC",
      },
    });
    return { products, total: products.length };
  }

  async optimizeAndSaveImage(files: Express.Multer.File[]): Promise<any[]> {
    const optimizedFileNames: any[] = [];

    await Promise.all(
      files.map(async (file) => {
        const optimizedImageBuffer = await sharp(file.buffer)
          .resize({ width: 800 }) // Resize the image to a maximum width of 800px (adjust as needed)
          .jpeg({ quality: 80 }) // Convert the image to JPEG format with 80% quality (adjust as needed)
          .toBuffer();

        const optimizedFileName = `${uuid()}${extname(file.originalname)}`;
        const optimizedFilePath = `./uploads/files/products/${optimizedFileName}`;

        await writeFile(optimizedFilePath, optimizedImageBuffer);
        optimizedFileNames.push({imagePath: optimizedFilePath, originalFileName: file.originalname});
      })
    );
    return optimizedFileNames;
  }

  async createManyFromFile(table: any): Promise<any> {
    const products = await this.createProductsFromExcel(table)
    console.log(products)
  }
  async uploadPhotosMany(files: Array<Express.Multer.File>) {
    console.log(files)
    if (files !== null || files !== undefined) {
      const optimizedFileNames = await this.optimizeAndSaveImage(files);
      
      optimizedFileNames.forEach(async (image) => {
        const product = await this.productRepository.findOne({  where: { model: image.originalFileName.split('_')[0] } });
        console.log(product)
        const productImage = new ProductImage();
        productImage.imagePath = image.imagePath;
        productImage.product = product;
        await this.productImageRepository.save(productImage);
      });
    }
  }

  parseExcelDataToObjects(table: any): any[] {
    return table.slice(2).map((item: any) => ({
      name: item.__EMPTY,
      model: item.__EMPTY_1,
      code: item.__EMPTY_2,
      sizeType: item.__EMPTY_3,
      diapazoneSize: item.__EMPTY_4,
      sizeAssortment: item.__EMPTY_5,
      countPairsInBox: item.__EMPTY_6,
      countBoxes: item.__EMPTY_7
    }));
  }
  async createProductsFromExcel(table: any): Promise<any> {
    const transformedData = this.parseExcelDataToObjects(table)
    const products = transformedData.map(async (product: any) => {
      const productEntity = await this.productRepository.save({
        name: product.name,
        model: product.model,
        code: product.code,
        sizeType: product.sizeType,
        diapazoneSize: product.diapazoneSize,
        sizeAssortment: product.sizeAssortment,
        countPairsInBox: product.countPairsInBox,
        countBoxes: product.countBoxes,
        price: 0,
      });
      return productEntity;
    }, []);
    return Promise.all(products);
  }
}


