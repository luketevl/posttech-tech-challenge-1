import type CarRepository from 'src/application/repository/CarRepository.ts';
import type OrderRepository from 'src/application/repository/OrderRepository.ts';
import { CAR_STATUS } from 'src/config/Status.ts';
import Order from 'src/domain/Order.ts';
import type UseCase from '../UseCase.ts';
import EntityHistory from 'src/domain/entity/EntityHistory.ts';
import type EntityHistoryRepository from 'src/application/repository/EntityHistoryRepository.ts';

export default class CreateOrder implements UseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly carRepository: CarRepository,
    private readonly entityHistoryRepository: EntityHistoryRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const carExists = await this.carRepository.get(input.carId);
    if (!carExists) throw new Error('Car not found');
    const carSold = await this.orderRepository.getByCar(input.carId);
    if (carSold || carExists.status === CAR_STATUS.SOLD) throw new Error('Car not available to this order');
    const order = Order.create(input.carId, input.total, input.cpf);
    await this.orderRepository.save(order);
    const history = EntityHistory.create(input.carId, JSON.stringify(carExists));
    await this.entityHistoryRepository.save(history)
    carExists.sell();
    await this.carRepository.update(carExists.carId, carExists)
    return {
      orderId: order.orderId,
      carId: carExists.carId,
      total: order.total,
      cpf: order.cpf,
      createAt: order.createAt,
    };
  }
}
type Input = {
  carId: string;
  total: number;
  cpf: string;
};
type Output = {
  orderId: string;
  carId: string;
  total: number;
  cpf: string;
  createAt: Date;
};
