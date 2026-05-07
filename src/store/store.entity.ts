import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';

@Entity()
export class Store {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_store: string;

  @Column()
  address: string;

  @OneToMany(() => Inventory, inventory => inventory.store)
  inventories: Inventory[];
}