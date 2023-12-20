import { Module } from "@nestjs/common";
import { ProductFeaturesService } from "./product-features.service";
import { ProductFeaturesController } from "./product-features.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductFeature } from "./entities/product-feature.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductFeature])],
  controllers: [ProductFeaturesController],
  providers: [ProductFeaturesService],
  exports: [ProductFeaturesService],
})
export class ProductFeaturesModule {}
