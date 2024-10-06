import type CarRepository from 'src/application/repository/CarRepository.ts';
import type { CAR_STATUS } from 'src/config/Status.ts';
import type Car from 'src/domain/entity/Car.ts';
import type ORM from '../orm/ORM.ts';
export default class CarRepositoryOrm implements CarRepository {
  constructor(private readonly orm: ORM) {}
  async get(id: string): Promise< Car> {
    throw new Error('Method not implemented.');
  }
  async save(car: Car): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, car: Car): Promise<Car> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async list(status: keyof typeof CAR_STATUS): Promise<Array<Car>> {
    throw new Error('Method not implemented.');
  }
}
