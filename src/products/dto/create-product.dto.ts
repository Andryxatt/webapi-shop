import { ApiProperty } from "@nestjs/swagger";
import { CreateProductFeatureDto } from "@product-features/dto/create-product-feature.dto";
import { IsNotEmpty, IsString } from "class-validator";
import { Unique } from "typeorm";
export class CreateProductDto {
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Unique(["model"])
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
  images?: any[];
  @ApiProperty({
    isArray: true,
  })
  sizes: CreateSizeProdDto[];
}
export class CreateSizeProdDto {
  @ApiProperty()
  sizeId: number;
  @ApiProperty()
  quantity: number;
}
