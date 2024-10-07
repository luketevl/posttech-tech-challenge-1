import type CarRepository from 'src/application/repository/CarRepository.ts';
import type OrderRepository from 'src/application/repository/OrderRepository.ts';
import type UseCase from '../UseCase.ts';

export default class DeleteCar implements UseCase {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const carSold = await this.orderRepository.getByCar(input);
    if (carSold) throw new Error('Sold car not be deleted');

    await this.carRepository.delete(input);
    return { status: true};
  }
}
type Input = string;
type Output = { status: boolean };
