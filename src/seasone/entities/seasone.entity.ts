import { Product } from "src/products/entities/product.entity";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, Entity } from "typeorm";
@Entity("Seasones")
export class Seasone {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ unique: true })
  name: string;
  @OneToMany(() => Product, product => product.seasone)
  products: Product[];
}
