import { Product } from "../../products/entities/product.entity";
import { Feature } from "../../features/entities/feature.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
@Entity("ProductFeatures")
export class ProductFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Product, product => product.features, {
    onDelete: "CASCADE",
  })
  product: Product;

  @ManyToOne(() => Feature, feature => feature.featuresProduct, {
    eager: true,
  })
  feature: Feature;
}
