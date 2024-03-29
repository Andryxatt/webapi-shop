import { OrderItem } from "../../order-item/entities/order-item.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  dateOrder: Date;
  @Column()
  dateDelivery: Date;
  @Column()
  status: string;
  @Column()
  total: number;
  @Column()
  userId: string;
  @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId)
  orderItems: OrderItem[];
}
