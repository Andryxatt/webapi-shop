/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { Order } from 'src/order/entities/order.entity';
import { Role } from 'src/utils/role.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  public email!: string;
  @Column({ unique: true })
  username: string;
  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;
  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;
  @OneToMany(() => Order, (order) => order.userId)
  orders: Order[];
  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User],
  })
  roles: Role[];
}
