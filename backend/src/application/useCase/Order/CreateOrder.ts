import type CarRepository from 'src/application/repository/CarRepository.ts';
import type OrderRepository from 'src/application/repository/OrderRepository.ts';
import Order from 'src/domain/Order.ts';
import type UseCase from '../UseCase.ts';

export default class CreateOrder implements UseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly carRepository: CarRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const carExists = await this.carRepository.get(input.carId);
    if (!carExists) throw new Error('Car not found');
    const carSold = await this.orderRepository.getByCar(input.carId);
    if (carSold) throw new Error('Car not available to this order');
    const order = await Order.create(input.carId, input.total, input.cpf);
    await this.orderRepository.save(order);
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
