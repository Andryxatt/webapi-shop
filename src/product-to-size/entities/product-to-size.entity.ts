import { Product } from "src/products/entities/product.entity";
import { Size } from "src/sizes/entities/size.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("SizesProduct")
export class ProductToSize {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product, p => p.sizes, {
    onDelete: "CASCADE",
  })
  product: Product;

  @ManyToOne(() => Size, s => s.sizesProduct, {
    eager: true,
  })
  size: Size;
  @Column()
  quantity: number;
}
