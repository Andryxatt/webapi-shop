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
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity("Products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;

  @Column({nullable: true})
  model: string;
  @Column({ nullable: true })
  colorCode?: string;
  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;
  @Column({ nullable: true })
  curencyPrice?: string;

  @Column({ nullable: true })
  priceSaleUAHPair?: number;
  @Column({ nullable: true })
  priceSaleUAHBox?: number;

  @Column({ nullable: true })
  priceSaleUSDPair?: number;
  @Column({ nullable: true })
  priceSaleUSDBox?: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 0, nullable: true })
  countPairsInBox?: number;
  @Column({ default: 0, nullable: true })
  countBoxes?: number;
  @Column({ nullable: true })
  diapazoneSize?: string;
  @Column({nullable: true})
  sizeAssortment?: string;

  @Column({ default: 0 })
  likes?: number;
  @Column({ default: "доступний" })
  status?: string;

  @Column({ default: 0 })
  code?: number;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products, {
    eager: true,
  })
  @JoinColumn()
  brand?: Brand;

  @ManyToOne(() => Seasone, (seasone) => seasone.products, {
    eager: true,
  })
  @JoinColumn()
  seasone?: Seasone;

  @ManyToOne(() => Gender, (gender) => gender.products, {
    eager: true,
  })
  @JoinColumn()
  gender?: Gender;

  @ManyToOne(() => Discount, (discount) => discount.products, {
    eager: true,
  })
  @JoinColumn()
  discount?: Discount;

  @ManyToMany(() => SubCategory, (subCategory) => subCategory.products, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  subCategories?: SubCategory[];

  @OneToMany(() => ProductFeature, (feature) => feature.product, {
    onDelete: "CASCADE",
  })
  features?: ProductFeature[];

  @ManyToMany(() => Colore, (colore) => colore.products, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  colores?: Colore[];


  @OneToMany(() => ProductToSize, (ps) => ps.product, {
    onDelete: "CASCADE",
  })
  sizes?: ProductToSize[];


  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    onDelete: "CASCADE",
  })
  images?: ProductImage[];

  @OneToMany(() => OrderItem, (order_items) => order_items.product)
  orderItems?: OrderItem[];
}
