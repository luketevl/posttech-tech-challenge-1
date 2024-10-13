import type { CAR_STATUS } from 'src/config/Status.ts';
import type Car from 'src/domain/entity/Car.ts';
export default interface CarRepository {
  get(id: string): Promise<Car | null>;
  save(car: Car): Promise<void>;
  update(id: string, car: Car): Promise<void>;
  delete(id: string): Promise<void>;
  list(status: keyof typeof CAR_STATUS): Promise<Array<Car>>;
}
