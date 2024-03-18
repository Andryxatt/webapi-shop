import { Injectable } from "@nestjs/common";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { UpdateFeatureDto } from "./dto/update-feature.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Feature } from "./entities/feature.entity";

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>
  ) {}
  create(createFeatureDto: CreateFeatureDto) {
    return this.featureRepository.save(createFeatureDto);
  }

  findAll(): Promise<Feature[]> {
    return this.featureRepository.find();
  }

  findOne(id: number): Promise<Feature> {
    return this.featureRepository.findOneBy({ id: id });
  }

  update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return this.featureRepository.update(id, updateFeatureDto);
  }

  remove(id: number) {
    return this.featureRepository.delete(id);
  }
}
