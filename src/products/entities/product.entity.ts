import { ProductFeature } from "../../product-features/entities/product-feature.entity";
import { Brand } from "../../brands/entities/brand.entity";
import { Colore } from "../../colore/entities/colore.entity";
import { Discount } from "../../discount/entities/discount.entity";
import { Gender } from "../../gender/entities/gender.entity";
import { OrderItem } from "../../order-item/entities/order-item.entity";
import { ProductImage } from "../../product-images/entities/product-image.entity";
import { ProductToSize } from "../../product-to-size/entities/product-to-size.entity";
import { Seasone } from "../../seasone/entities/seasone.entity";
import { SubCategory } from "../../sub-categories/entities/sub-category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity("Products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ unique: true })
  model: string;
  @Column()
  price: string;
  @Column()
  curencyPrice: string;
  @Column()
  description?: string;
  @Column({ default: "доступний" })
  status: string;
  @ManyToOne(() => Brand, brand => brand.products, {
    eager: true,
  })
  @JoinColumn()
  brand: Brand;
  @ManyToOne(() => Seasone, seasone => seasone.products, {
    eager: true,
  })
  @JoinColumn()
  seasone: Seasone;
  @ManyToOne(() => Gender, gender => gender.products, {
    eager: true,
  })
  @JoinColumn()
  gender: Gender;
  @ManyToOne(() => Discount, discount => discount.products, {
    eager: true,
  })
  @JoinColumn()
  discount: Discount;
  @ManyToMany(() => SubCategory, subCategory => subCategory.products, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  subCategories: SubCategory[];

  @OneToMany(() => ProductFeature, feature => feature.product, {
    onDelete: "CASCADE",
  })
  features: ProductFeature[];

  @ManyToMany(() => Colore, colore => colore.products, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  colores: Colore[];

  @OneToMany(() => ProductToSize, ps => ps.product, {
    onDelete: "CASCADE",
  })
  sizes: ProductToSize[];

  @OneToMany(() => ProductImage, productImage => productImage.product, {
    onDelete: "CASCADE",
  })
  images: ProductImage[];
  @OneToMany(() => OrderItem, order_items => order_items.product)
  orderItems: OrderItem[];
}
