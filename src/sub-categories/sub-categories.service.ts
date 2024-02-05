import { HttpException, Injectable } from "@nestjs/common";
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto";
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubCategory } from "./entities/sub-category.entity";
import { Category } from "@categories/entities/category.entity";

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}
  create(createSubCategoryDto: CreateSubCategoryDto) {
    const subCategory = this.subCategoryRepository.create({
      ...createSubCategoryDto,
      category: { id: createSubCategoryDto.categoryId },
    });
    return this.subCategoryRepository.save(subCategory);
  }

  findAll(): Promise<SubCategory[]> {
    return this.subCategoryRepository.find({
      relations: {
        category: true,
      },
    });
  }

  findOne(id: number): Promise<SubCategory> {
    return this.subCategoryRepository.findOne({
      where: {
        id,
      },
      relations: ["category"],
    });
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto): Promise<SubCategory> {
    // await this.subCategoryRepository.update(id, updateSubCategoryDto);
    const updatedSubCategory = await this.subCategoryRepository.findOne({
      where: {
        id,
      },
      relations: ["category"],
    });
    updatedSubCategory.name = updateSubCategoryDto.name;
    updatedSubCategory.description = updateSubCategoryDto.description;
    updatedSubCategory.category = await this.categoryRepository.findOne({
      where: {
        id: updateSubCategoryDto.categoryId,
      },
    });
    if (updatedSubCategory) {
      await this.subCategoryRepository.update(id, updatedSubCategory);
      return updatedSubCategory;
    }
    throw new HttpException("Not found", 404);
  }

  remove(id: number) {
    return this.subCategoryRepository.delete(id);
  }
}
