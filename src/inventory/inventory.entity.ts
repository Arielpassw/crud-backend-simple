import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products/product.entity';
import { Store } from '../store/store.entity';

@Entity()
export class Inventory {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stock: number;

  @ManyToOne(() => Product, product => product.inventories)
  product: Product;

  @ManyToOne(() => Store, store => store.inventories)
  store: Store;
}