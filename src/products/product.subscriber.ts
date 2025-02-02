import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  DataSource,
  Connection,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  // Especificamos que este subscriber escucha cambios en la entidad Product
  listenTo() {
    return Product;
  }

  // Se ejecuta después de insertar un producto
  async afterInsert(event: InsertEvent<Product>) {
    /* console.log('Product inserted: ', event.entity); */
  }
}
