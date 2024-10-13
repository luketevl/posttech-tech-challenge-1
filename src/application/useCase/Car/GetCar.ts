import type CarRepository from 'src/application/repository/CarRepository.ts';
import type UseCase from '../UseCase.ts';

export default class GetCar implements UseCase {
  constructor(
    private readonly carRepository: CarRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const carExists = await this.carRepository.get(input);
    if (!carExists) throw new Error('Car not found');
    return {
      carId: carExists.carId,
      brand: carExists.brand,
      model: carExists.model,
      year: carExists.year.getValue(),
      color: carExists.color,
      price: carExists.price,
      status: carExists.status,
    };
  }
}
type Input = string
type Output = {
  carId: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  price: number;
  status: string;
};
