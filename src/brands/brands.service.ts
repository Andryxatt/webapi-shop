/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { removeFile } from 'src/utils/remove-file';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  create(createBrandDto: CreateBrandDto, file: any) {
    const brand = new Brand();
    brand.name = createBrandDto.name;
    if(file !== undefined && file !== null){
      brand.iconPath = file.path;
    }
    else {
      brand.iconPath = "default.png"
    }
    brand.description = createBrandDto.description;
    return this.brandRepository.save(brand);
  }

  findAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

 async findOne(id: number): Promise<Brand> {
  const brand = await this.brandRepository.findOneBy({id: id});
   return brand;
  }

 async update(id: number, updateBrandDto: UpdateBrandDto, file: any): Promise<Brand> {
    const brand = await this.brandRepository.findOneBy({ id: id });
    if(file !== undefined && file !== null){
      await removeFile(brand.iconPath);
      brand.iconPath = file.path;
    }
    brand.name = updateBrandDto.name;
    brand.description = updateBrandDto.description;
    await this.brandRepository.update(id, brand);
    return brand;
  }

 async remove(id: number) {
    const brand = await this.brandRepository.findOneBy({ id: id });
    try{
      await removeFile(brand.iconPath);
    }
    catch(err){
      console.log(err);
    }
  
    return this.brandRepository.delete(id);
  }
}
