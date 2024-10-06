import type { CAR_STATUS } from 'src/config/Status.ts';
import type Car from 'src/domain/entity/Car.ts';
export default interface CarRepository {
  get(id: string): Promise<Car>;
  save(car: Car): Promise<void>;
  update(id: string, car: Car): Promise<Car>;
  delete(id: string): Promise<boolean>;
  list(status: keyof typeof CAR_STATUS): Promise<Array<Car>>;
}
