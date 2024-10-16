import { SCHEMA } from 'src/config/Database.ts';
import type { CAR_STATUS } from 'src/config/Status.ts';
import Car from '../../domain/entity/Car.ts';
import { Model, column, model } from './ORM.ts';

@model(SCHEMA, 'car')
export default class CarModel extends Model {
  @column('car_id', true)
  carId: string;
  @column('status')
  status: keyof typeof CAR_STATUS;
  @column('price', false, 'number')
  price: number;
  @column('brand')
  brand: string;
  @column('model')
  model: string;
  @column('color')
  color: string;
  @column('year')
  year: string;
  @column('create_at')
  createAt: Date;
  @column('update_at')
  updateAt: Date;

  constructor(
    carId: string,
    price: number,
    status: keyof typeof CAR_STATUS,
    brand: string,
    model: string,
    color: string,
    createAt: Date,
    updateAt: Date,
    year: string,
  ) {
    super();
    this.carId = carId;
    this.status = status;
    this.price = price;
    this.brand = brand;
    this.color = color;
    this.model = model;
    this.createAt = createAt;
    this.updateAt = updateAt;
    this.year = year;
  }

  getAggregate() {
    return new Car(
      this.carId,
      this.price,
      this.status,
      this.brand,
      this.model,
      this.color,
      this.createAt,
      this.updateAt,
      this.year,
    );
  }

  static getModelFromAggregate(car: Car) {
    return new CarModel(
      car.carId,
      car.price,
      car.status,
      car.brand,
      car.model,
      car.color,
      car.createAt,
      car.updateAt,
      car.year.getValue(),
    );
  }
}
