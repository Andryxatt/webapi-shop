import { Product } from "../../products/entities/product.entity";
import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
@Entity("Brands")
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ unique: true })
  name: string;
  @Column({ default: "/uploads/default-brand-icon.png" })
  iconPath: string;
  @Column()
  description: string;
  @OneToMany(() => Product, product => product.brand)
  products: Product[];
}
