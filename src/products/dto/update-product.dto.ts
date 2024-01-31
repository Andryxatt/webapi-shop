import { ApiProperty } from "@nestjs/swagger";
import { CreateSizeProdDto } from "./create-product.dto";
import { CreateProductFeatureDto } from "@product-features/dto/create-product-feature.dto";
import { IsString, IsNotEmpty } from "class-validator";

export class UpdateProductDto {
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;
  @ApiProperty()
  @IsString()
  description?: string;
  @ApiProperty()
  @IsString()
  status?: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  price: string;
  @ApiProperty()
  @IsString()
  curencyPrice: string;
  @ApiProperty()
  brandId?: number;
  @ApiProperty()
  genderId?: number;
  @ApiProperty()
  seasoneId?: number;
  @ApiProperty()
  discountId?: number;
  @ApiProperty({
    isArray: true,
  })
  subCategories?: object[];
  @ApiProperty({
    isArray: true,
  })
  features?: CreateProductFeatureDto[];
  @ApiProperty({
    isArray: true,
  })
  colores?: object[];
  @ApiProperty({
    isArray: true,
  })
  sizes?: CreateSizeProdDto[];
}
