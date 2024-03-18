import { Module } from "@nestjs/common";
import { SubCategoriesService } from "./sub-categories.service";
import { SubCategoriesController } from "./sub-categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubCategory } from "./entities/sub-category.entity";
import { Category } from "@categories/entities/category.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([SubCategory]),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
