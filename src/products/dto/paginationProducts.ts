/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../entities/product.entity";

export class PaginationProducts {
  @ApiProperty()
  products: Product[];
  @ApiProperty()
  total: number;
}
