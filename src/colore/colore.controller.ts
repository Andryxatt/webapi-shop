import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ColoreService } from "./colore.service";
import { CreateColoreDto } from "./dto/create-colore.dto";
import { UpdateColoreDto } from "./dto/update-colore.dto";

@Controller("colores")
export class ColoreController {
  constructor(private readonly coloreService: ColoreService) {}

  @Post()
  create(@Body() createColoreDto: CreateColoreDto) {
    return this.coloreService.create(createColoreDto);
  }

  @Get()
  findAll() {
    return this.coloreService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coloreService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateColoreDto: UpdateColoreDto) {
    return this.coloreService.update(+id, updateColoreDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coloreService.remove(+id);
  }
}
