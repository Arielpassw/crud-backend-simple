import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Inventory } from './inventory.entity';
import { Product } from '../products/product.entity';
import { Store } from '../store/store.entity';

import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Product, Store])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}