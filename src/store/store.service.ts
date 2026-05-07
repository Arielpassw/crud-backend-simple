import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';

@Injectable()
export class StoreService {

  constructor(
    @InjectRepository(Store)
    private repo: Repository<Store>,
  ) {}

  // Crear tienda
  create(data: any) {
    return this.repo.save(data);
  }

  // Obtener todas
  findAll() {
    return this.repo.find();
  }

  // Obtener por ID
  async findOne(id: number) {
    const store = await this.repo.findOne({ where: { id } });

    if (!store) {
      throw new NotFoundException('Tienda no encontrada');
    }

    return store;
  }

  // Actualizar
  async update(id: number, data: any) {
    const store = await this.findOne(id);

    Object.assign(store, data);

    return this.repo.save(store);
  }

  // Eliminar
  async remove(id: number) {
    const result = await this.repo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Tienda no encontrada');
    }
  }
}