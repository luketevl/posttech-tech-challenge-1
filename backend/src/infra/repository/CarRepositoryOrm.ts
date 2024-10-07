import type CarRepository from 'src/application/repository/CarRepository.ts';
import type { CAR_STATUS } from 'src/config/Status.ts';
import Car from 'src/domain/entity/Car.ts';
import CarModel from '../orm/CarModel.ts';
import type ORM from '../orm/ORM.ts';
export default class CarRepositoryOrm implements CarRepository {
  constructor(private readonly orm: ORM) {}
  async get(id: string): Promise<Car | null> {
    const car = await this.orm.get('car_id', id, CarModel);
    if (car)
      return new Car(
        car.carId,
        car.price,
        car.status,
        car.brand,
        car.model,
        car.color,
        car.year,
      );
    return null;
  }
  async save(car: Car): Promise<void> {
    await this.orm.save(CarModel.getModelFromAggregate(car));
  }
  async update(id: string, car: Car): Promise<void> {
    await this.orm.update('car_id', id, CarModel.getModelFromAggregate(car));
  }
  async delete(id: string): Promise<void> {
    await this.orm.delete('car_id', id, CarModel);
  }
  async list(status: keyof typeof CAR_STATUS): Promise<Array<Car>> {
    const cars = await this.orm.getAll('status', status, 'price ASC', CarModel)
    console.log(cars)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    if(cars) return cars.map((car: any) => new Car(
        car.carId,
        car.price,
        car.status,
        car.brand,
        car.model,
        car.color,
        car.year,
      ))
      return []
  }
}
