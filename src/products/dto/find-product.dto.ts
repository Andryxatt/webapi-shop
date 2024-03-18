/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class FindProductDto {
  @ApiProperty()
  pageNumber?: number;
  @ApiProperty()
  limit?: number;
  @ApiProperty()
  search?: string;
  @ApiProperty()
  categories?: number[];
  @ApiProperty()
  minPrice?: number;
  @ApiProperty()
  maxPrice?: number;
  @ApiProperty()
  brands?: number[];
  @ApiProperty()
  orderBy?: string;
  @ApiProperty()
  subCategories?: number[];
  @ApiProperty()
  gender?: string;
  @ApiProperty()
  colors?: string[];
  @ApiProperty()
  sizes?: string[];
  @ApiProperty()
  discount?: boolean;
  @ApiProperty()
  seasones?: number[];
  @ApiProperty()
  features?: number[];
}
