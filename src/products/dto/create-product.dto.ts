/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { CreateProductFeatureDto } from "@product-features/dto/create-product-feature.dto";
import { IsDecimal, IsNotEmpty, IsString } from "class-validator";
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
  @IsDecimal({ decimal_digits: "1,2" })
  price: number;
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
  code?: number;

  @ApiProperty()
  diapazoneSize?: string;
  @ApiProperty()
  sizeAssortment?: string;

  @ApiProperty()
  discountId?: number;
  @ApiProperty()
  likes?: number;
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
