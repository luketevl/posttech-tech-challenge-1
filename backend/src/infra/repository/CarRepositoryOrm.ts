import type CarRepository from 'src/application/repository/CarRepository.ts';
import type { CAR_STATUS } from 'src/config/Status.ts';
import type Car from 'src/domain/entity/Car.ts';
import type DatabaseConnection from '../database/DatabaseConnection.ts';
export default class CarRepositoryOrm implements CarRepository {
  constructor(private readonly client: DatabaseConnection) {}
  get(id: string): Car {
    throw new Error('Method not implemented.');
  }
  save(car: Car): Car {
    throw new Error('Method not implemented.');
  }
  update(id: string, car: Car): Car {
    throw new Error('Method not implemented.');
  }
  delete(id: string): boolean {
    throw new Error('Method not implemented.');
  }
  list(status: keyof typeof CAR_STATUS): Array<Car> {
    throw new Error('Method not implemented.');
  }
}
