import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProductImageDto {
  @IsString()
  @ApiProperty()
  imagePath: string;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  description: string;
}
