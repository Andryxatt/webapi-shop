import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './entities/size.entity';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}
  create(createSizeDto: CreateSizeDto): Promise<Size> {
    return this.sizeRepository.save(createSizeDto);
  }

  findAll(): Promise<Size[]> {
    return this.sizeRepository.find();
  }

  findOne(id: number): Promise<Size> {
    return this.sizeRepository.findOneBy({ id: id });
  }

  update(id: number, updateSizeDto: UpdateSizeDto) {
    return this.sizeRepository.update(id, updateSizeDto);
  }

  remove(id: number) {
    return this.sizeRepository.delete(id);
  }
}
