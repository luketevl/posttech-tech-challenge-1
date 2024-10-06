import type { CAR_STATUS } from 'src/config/Status.ts';
import type Car from 'src/domain/entity/Car.ts';
export default interface CarRepository {
  get(id: string): Car;
  save(car: Car): Car;
  update(id: string, car: Car): Car;
  delete(id: string): boolean;
  list(status: keyof typeof CAR_STATUS): Array<Car>;
}
