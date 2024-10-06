import type OrderRepository from 'src/application/repository/OrderRepository.ts';
import type Order from 'src/domain/Order.ts';
import type ORM from '../orm/ORM.ts';

export default class OrderRepositoryOrm implements OrderRepository {
  constructor(private readonly orm: ORM) {}
  getByCar(carId: string): Order {
    throw new Error('Method not implemented.');
  }
  save(order: Order): Order {
    throw new Error('Method not implemented.');
  }
}
