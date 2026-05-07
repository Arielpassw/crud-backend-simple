import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { StoreModule } from './store/store.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'Ariel', // o 'nest_user' si creaste uno
      password: '12345', // reemplaza con tu contraseña
      database: 'Nuevo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // solo para desarrollo! Crea tablas automáticamente
      logging: true, // muestra consultas SQL en consola
    }),
    ProductsModule,
    StoreModule,
    InventoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }