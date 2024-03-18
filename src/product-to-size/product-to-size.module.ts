import { Module } from "@nestjs/common";
import { ProductToSizeService } from "./product-to-size.service";
import { ProductToSizeController } from "./product-to-size.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductToSize } from "./entities/product-to-size.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductToSize])],
  controllers: [ProductToSizeController],
  providers: [ProductToSizeService],
  exports: [ProductToSizeService],
})
export class ProductToSizeModule {}
