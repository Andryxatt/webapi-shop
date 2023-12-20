import { Product } from "@products/entities/product.entity";
import { ProductFeature } from "src/product-features/entities/product-feature.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("Features")
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(() => Product, product => product.features)
  public featuresProduct?: Product[];
}
