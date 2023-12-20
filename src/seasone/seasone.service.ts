import { Injectable } from '@nestjs/common';
import { CreateSeasoneDto } from './dto/create-seasone.dto';
import { UpdateSeasoneDto } from './dto/update-seasone.dto';

@Injectable()
export class SeasoneService {
  create(createSeasoneDto: CreateSeasoneDto) {
    return 'This action adds a new seasone';
  }

  findAll() {
    return `This action returns all seasone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seasone`;
  }

  update(id: number, updateSeasoneDto: UpdateSeasoneDto) {
    return `This action updates a #${id} seasone`;
  }

  remove(id: number) {
    return `This action removes a #${id} seasone`;
  }
}
