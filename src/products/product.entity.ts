import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Inventory, inventory => inventory.product)
  inventories: Inventory[];
}