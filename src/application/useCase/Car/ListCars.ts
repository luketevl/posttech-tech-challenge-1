import type CarRepository from 'src/application/repository/CarRepository.ts';
import type { CAR_STATUS } from 'src/config/Status.ts';
import type UseCase from '../UseCase.ts';

export default class ListCars implements UseCase {
  constructor(
    private readonly carRepository: CarRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const carExists = await this.carRepository.list(input);
    return carExists.map(car => ({
      carId: car.carId,
      brand: car.brand,
      model: car.model,
      year: car.year.getValue(),
      color: car.color,
      price: car.price,
      status: car.status,
    }))
  }
}
type Input = keyof typeof CAR_STATUS;

type Output = Array<{
  carId: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  price: number;
  status: string;
}>;
