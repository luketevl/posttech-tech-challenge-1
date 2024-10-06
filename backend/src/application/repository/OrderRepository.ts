import type Order from 'src/domain/Order.ts';

export default interface OrderRepository {
  save(order: Order): Order;
  getByCar(carId: string): Order;
}
