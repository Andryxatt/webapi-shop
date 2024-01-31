import { Product } from "../../products/entities/product.entity";
import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany } from "typeorm";
@Entity("Colores")
export class Colore {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ unique: true })
  name: string;
  @Column()
  hexColor: string;
  @ManyToMany(() => Product, product => product.colores)
  products: Product[];
}
