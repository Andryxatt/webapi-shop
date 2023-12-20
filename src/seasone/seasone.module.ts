import { Module } from "@nestjs/common";
import { SeasoneService } from "./seasone.service";
import { SeasoneController } from "./seasone.controller";
import { Seasone } from "./entities/seasone.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Seasone])],
  controllers: [SeasoneController],
  providers: [SeasoneService],
  exports: [SeasoneService],
})
export class SeasoneModule {}
