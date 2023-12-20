import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('SubCategories')
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
    //load category when subcategory is loaded
    eager: true,
  })
  @JoinColumn({ name: 'CategoryId' })
  category: Category;
  @ManyToMany(() => Product, (product) => product.subCategories)
  products: Product;
}
