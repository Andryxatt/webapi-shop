import { Category } from "../../categories/entities/category.entity";
import { Product } from "../../products/entities/product.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("SubCategories")
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => Category, (category) => category.subCategories, {
    eager: true,
  })
  @JoinColumn({ name: "CategoryId" })
  category: Category;
  @ManyToMany(() => Product, (product) => product.subCategories)
  products: Product;
}
