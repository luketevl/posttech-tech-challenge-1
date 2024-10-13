import type CarRepository from 'src/application/repository/CarRepository.ts';
import type OrderRepository from 'src/application/repository/OrderRepository.ts';
import type UseCase from '../UseCase.ts';
import type EntityHistoryRepository from 'src/application/repository/EntityHistoryRepository.ts';
import EntityHistory from 'src/domain/entity/EntityHistory.ts';
import type Order from 'src/domain/Order.ts';

export default class DeleteCar implements UseCase {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly orderRepository: OrderRepository,
    private readonly entityHistoryRepository: EntityHistoryRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const carSold: Order | null = await this.orderRepository.getByCar(input);
    if (carSold) throw new Error('Sold car not be deleted');
    const car = await this.carRepository.get(input);
    const history = EntityHistory.create(input, JSON.stringify(car));
    await this.entityHistoryRepository.save(history)
    await this.carRepository.delete(input);
    return { status: true};
  }
}
type Input = string;
type Output = { status: boolean };
