import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDiscountDto {
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  percentage: number;
}
