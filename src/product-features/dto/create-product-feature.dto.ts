import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class CreateProductFeatureDto {
  @ApiProperty()
  @IsNotEmpty()
  productId: number;
  @ApiProperty()
  @IsNotEmpty()
  featureId: number;
  @ApiProperty()
  @IsString()
  description: string;
}
