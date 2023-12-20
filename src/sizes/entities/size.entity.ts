import { ProductToSize } from 'src/product-to-size/entities/product-to-size.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Sizes')
export class Size {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  CM: string;
  @Column()
  EU: string;
  @Column()
  Length: string;
  @Column()
  USA?: string;
  @OneToMany(() => Product, (product) => product.sizes)
  public sizesProduct?: Product[];
}
