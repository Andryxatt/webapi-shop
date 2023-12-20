import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
  @OneToMany(() => SubCategory, (subCategory) => subCategory.category, {
    onDelete: 'CASCADE',
  })
  subCategories: SubCategory[];
}
