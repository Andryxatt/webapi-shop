import { Order } from "../../order/entities/order.entity";
import { Product } from "../../products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Order, order => order.orderItems)
  orderId: Order;
  @ManyToOne(() => Product, product => product.orderItems)
  product: Product;
  @Column()
  quantity: number;
}
