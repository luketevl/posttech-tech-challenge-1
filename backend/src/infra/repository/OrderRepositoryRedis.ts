import OrderRepository from 'src/application/repository/OrderRepository.ts';
import Order from 'src/domain/Order.ts';
import DatabaseConnection from '../database/DatabaseConnection.ts';

export default class OrderRepositoryRedis implements OrderRepository {
  constructor(private readonly client: DatabaseConnection) {}
  save(order: Order): Order {
    throw new Error('Method not implemented.');
  }
}
