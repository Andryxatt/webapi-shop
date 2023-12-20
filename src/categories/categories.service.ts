import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id: id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updCategory = await this.categoryRepository.findOneBy({ id: id });
    updCategory.name = updateCategoryDto.name;
    updCategory.description = updateCategoryDto.description;
    await this.categoryRepository.update(id, updCategory);
    return updCategory;
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOneBy({ id: id });
    return this.categoryRepository.remove(category);
  }
}
