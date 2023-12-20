import { Injectable } from "@nestjs/common";
import { CreateColoreDto } from "./dto/create-colore.dto";
import { UpdateColoreDto } from "./dto/update-colore.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Colore } from "./entities/colore.entity";

@Injectable()
export class ColoreService {
  constructor(
    @InjectRepository(Colore)
    private readonly coloreRepository: Repository<Colore>,
  ) {}
  create(createColoreDto: CreateColoreDto) {
    return this.coloreRepository.save(createColoreDto);
  }

  findAll(): Promise<Colore[]> {
    return this.coloreRepository.find();
  }

  findOne(id: number): Promise<Colore> {
    return this.coloreRepository.findOneBy({ id: id });
  }

  update(id: number, updateColoreDto: UpdateColoreDto) {
    return this.coloreRepository.update(id, updateColoreDto);
  }

  remove(id: number) {
    return this.coloreRepository.delete(id);
  }
}
