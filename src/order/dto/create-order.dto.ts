import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {}
export class CreateOrderDetailDto {
  idProduct: number;
  quantity: number;
}
