import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdateDiscountDto {
  @IsNumber()
  @ApiProperty()
  percentage: number;
}
