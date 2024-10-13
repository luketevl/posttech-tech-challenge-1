import type CarRepository from 'src/application/repository/CarRepository.ts';
import type OrderRepository from 'src/application/repository/OrderRepository.ts';
import type Car from 'src/domain/entity/Car.ts';
import type UseCase from '../UseCase.ts';

export default class ListOrders implements UseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly carRepository: CarRepository,
  ) {}
  async execute(): Promise<Output> {
    const orders = await this.orderRepository.list();
    const newOrders = [];
    for (const index in orders) {
      const order = orders[index];
      const car = await this.carRepository.get(order.carId);
      newOrders.push({
        ...order,
        car,
      });
    }
    return newOrders;
  }
}
type Output = Array<{
  orderId: string;
  carId: string;
  total: number;
  cpf: string;
  createAt: Date;
  car: Car | null;
}>;
