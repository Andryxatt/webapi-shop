import { Injectable } from "@nestjs/common";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Discount } from "./entities/discount.entity";

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}
  create(createDiscountDto: CreateDiscountDto) {
    return this.discountRepository.save(createDiscountDto);
  }

  findAll(): Promise<Discount[]> {
    return this.discountRepository.find();
  }

  findOne(id: number): Promise<Discount> {
    return this.discountRepository.findOneBy({ id: id });
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return this.discountRepository.update(id, updateDiscountDto);
  }

  remove(id: number) {
    return this.discountRepository.delete(id);
  }
}
