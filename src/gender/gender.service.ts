import { Injectable } from "@nestjs/common";
import { CreateGenderDto } from "./dto/create-gender.dto";
import { UpdateGenderDto } from "./dto/update-gender.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Gender } from "./entities/gender.entity";
import { Repository } from "typeorm";

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}
  create(createGenderDto: CreateGenderDto) {
    return this.genderRepository.save(createGenderDto);
  }

  findAll(): Promise<Gender[]> {
    return this.genderRepository.find();
  }

  findOne(id: number): Promise<Gender> {
    return this.genderRepository.findOneBy({ id: id });
  }

  update(id: number, updateGenderDto: UpdateGenderDto) {
    return this.genderRepository.update({ id: id }, updateGenderDto);
  }

  remove(id: number) {
    return this.genderRepository.delete({ id: id });
  }
}
