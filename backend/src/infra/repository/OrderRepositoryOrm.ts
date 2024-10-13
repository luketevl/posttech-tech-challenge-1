import type OrderRepository from 'src/application/repository/OrderRepository.ts';
import Order from 'src/domain/Order.ts';
import type ORM from '../orm/ORM.ts';
import OrderModel from '../orm/OrderModel.ts';

export default class OrderRepositoryOrm implements OrderRepository {
  constructor(private readonly orm: ORM) {}
  async list(): Promise<Array<Order>> {
    const orders = await this.orm.list(OrderModel);
    return orders.map(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (order: any) =>
        new Order(
          order.order_id,
          order.car_id,
          order.cpf,
          order.total,
          order.create_at,
        ),
    );
  }
  async getByCar(carId: string): Promise<Order | null> {
    return this.orm.get('car_id', carId, OrderModel);
  }
  async save(order: Order): Promise<void> {
    this.orm.save(OrderModel.getModelFromAggregate(order));
  }
}
