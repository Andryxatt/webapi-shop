import { ApiProperty } from '@nestjs/swagger';

export class CreateProductToSizeDto {
  @ApiProperty()
  productId: number;
  @ApiProperty()
  sizeId: number;
  @ApiProperty()
  quantity: number;
}
