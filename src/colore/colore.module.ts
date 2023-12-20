import { Module } from "@nestjs/common";
import { ColoreService } from "./colore.service";
import { ColoreController } from "./colore.controller";
import { Colore } from "./entities/colore.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Colore])],
  controllers: [ColoreController],
  providers: [ColoreService],
  exports: [ColoreService],
})
export class ColoreModule {}
