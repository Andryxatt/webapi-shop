import { Product } from "../../products/entities/product.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("Discounts")
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column()
  percentage: number;
  @OneToMany(() => Product, (product) => product.discount)
  products: Product[];
}
