import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Inventory } from './inventory.entity';
import { Product } from '../products/product.entity';
import { Store } from '../store/store.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {

  constructor(
    @InjectRepository(Inventory)
    private inventoryRepo: Repository<Inventory>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(Store)
    private storeRepo: Repository<Store>,
  ) {}


  // Crear inventario
  async create(dto: CreateInventoryDto): Promise<Inventory> {

    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!product) throw new NotFoundException('Producto no encontrado');

    const store = await this.storeRepo.findOne({
      where: { id: dto.storeId },
    });

    if (!store) throw new NotFoundException('Tienda no encontrada');

    const inventory = this.inventoryRepo.create({
      stock: dto.stock,
      product,
      store,
    });

    return this.inventoryRepo.save(inventory);
  }

  // Obtener todas
  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepo.find({
      relations: ['product', 'store'],
    });
  }


  // Obtener por ID
  async findOne(id: number): Promise<Inventory> {
    const inventory = await this.inventoryRepo.findOne({
      where: { id },
      relations: ['product', 'store'],
    });

    if (!inventory) {
      throw new NotFoundException(`Inventario ${id} no encontrado`);
    }

    return inventory;
  }
  
  // Actualizar
  async update(id: number, dto: UpdateInventoryDto): Promise<Inventory> {
    const inventory = await this.findOne(id);

    
    if (dto.productId) {
      const product = await this.productRepo.findOne({
        where: { id: dto.productId },
      });
      if (!product) throw new NotFoundException('Producto no encontrado');
      inventory.product = product;
    }

    if (dto.storeId) {
      const store = await this.storeRepo.findOne({
        where: { id: dto.storeId },
      });
      if (!store) throw new NotFoundException('Tienda no encontrada');
      inventory.store = store;
    }

    if (dto.stock !== undefined) {
      inventory.stock = dto.stock;
    }

    return this.inventoryRepo.save(inventory);
  }

  // Eliminar
  async remove(id: number): Promise<void> {
    const result = await this.inventoryRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Inventario ${id} no encontrado`);
    }
  }
}