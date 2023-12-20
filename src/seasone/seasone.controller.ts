import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CreateSeasoneDto } from "./dto/create-seasone.dto";
import { UpdateSeasoneDto } from "./dto/update-seasone.dto";
import { Seasone } from "./entities/seasone.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Controller("seasones")
export class SeasoneController {
  constructor(
    @InjectRepository(Seasone)
    private readonly seasoneRepository: Repository<Seasone>,
  ) {}

  @Post()
  create(@Body() createSeasoneDto: CreateSeasoneDto) {
    return this.seasoneRepository.save(createSeasoneDto);
  }

  @Get()
  findAll(): Promise<Seasone[]> {
    return this.seasoneRepository.find();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Seasone> {
    return await this.seasoneRepository.findOneBy({ id: +id });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSeasoneDto: UpdateSeasoneDto) {
    return this.seasoneRepository.update(+id, updateSeasoneDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seasoneRepository.delete(+id);
  }
}
