/* eslint-disable prettier/prettier */
import { Product } from "../../products/entities/product.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity("ProductImages")
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  product: Product;
  @Column()
  imagePath: string;
}
