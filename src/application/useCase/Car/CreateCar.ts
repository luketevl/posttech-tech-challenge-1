import type CarRepository from 'src/application/repository/CarRepository.ts';
import type { CAR_STATUS } from 'src/config/Status.ts';
import Car from 'src/domain/entity/Car.ts';
import type UseCase from '../UseCase.ts';

export default class CreateCar implements UseCase {
  constructor(private readonly carRepository: CarRepository) {}
  async execute(input: Input): Promise<Output> {
    const car = Car.create(
      input.price,
      input.status,
      input.brand,
      input.model,
      input.color,
      input.year,
    );
    await this.carRepository.save(car);
    return {
      carId: car.carId,
      brand: car.brand,
      model: car.model,
      year: car.year.getValue(),
      color: car.color,
      price: car.price,
      status: car.status,
      createAt: car.createAt,
      updateAt: car.updateAt,
    };
  }
}
type Input = {
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
  createAt: Date;
  updateAt: Date;
};
