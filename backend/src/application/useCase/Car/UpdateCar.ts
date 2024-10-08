import type CarRepository from 'src/application/repository/CarRepository.ts';
import type OrderRepository from 'src/application/repository/OrderRepository.ts';
import { CAR_STATUS } from 'src/config/Status.ts';
import Car from 'src/domain/entity/Car.ts';
import type UseCase from '../UseCase.ts';

export default class UpdateCar implements UseCase {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const carExists = await this.carRepository.get(input.carId);
    if (!carExists) throw new Error('Car not found');
    const carSold = await this.orderRepository.getByCar(input.carId);
    if (carSold && input.status === CAR_STATUS.AVAILABLE) throw new Error('Sold car not be modified not available');
    const car = new Car(
      carExists.carId,
      input.price,
      input.status,
      input.brand,
      input.model,
      input.color,
      input.year,
    );
    await this.carRepository.update(carExists.carId, car);
    return {
      carId: car.carId,
      brand: car.brand,
      model: car.model,
      year: car.year.getValue(),
      color: car.color,
      price: car.price,
      status: car.status,
    };
  }
}
type Input = {
  carId: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  price: number;
  status: keyof typeof CAR_STATUS;
};
type Output = {
  carId: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  price: number;
  status: string;
};
