import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Brand } from "src/brands/entities/brand.entity";
import { Category } from "src/categories/entities/category.entity";
import { ProductImage } from "src/product-images/entities/product-image.entity";
import { SubCategory } from "src/sub-categories/entities/sub-category.entity";
import { ProductToSize } from "src/product-to-size/entities/product-to-size.entity";
import { Size } from "src/sizes/entities/size.entity";
import { JwtModule } from "@nestjs/jwt";
import { Seasone } from "src/seasone/entities/seasone.entity";
import { Colore } from "src/colore/entities/colore.entity";
import { Discount } from "src/discount/entities/discount.entity";
import { Feature } from "src/features/entities/feature.entity";
import { ProductFeature } from "@product-features/entities/product-feature.entity";
import { ProductImagesService } from "@product-images/product-images.service";
import { CloudStorageService } from "@core/services/cloud-storage.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Brand]),
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([ProductImage]),
    TypeOrmModule.forFeature([SubCategory]),
    TypeOrmModule.forFeature([ProductToSize]),
    TypeOrmModule.forFeature([Size]),
    TypeOrmModule.forFeature([Seasone]),
    TypeOrmModule.forFeature([Colore]),
    TypeOrmModule.forFeature([Discount]),
    TypeOrmModule.forFeature([Feature]),
    TypeOrmModule.forFeature([ProductFeature]),
    JwtModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CloudStorageService],
})
export class ProductsModule {}
