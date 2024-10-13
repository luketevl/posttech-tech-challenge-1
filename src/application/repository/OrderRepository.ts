import type Order from 'src/domain/Order.ts';

export default interface OrderRepository {
  save(order: Order): Promise<void>;
  getByCar(carId: string): Promise<Order | null>;
  list(): Promise<Array<Order>>;
}
