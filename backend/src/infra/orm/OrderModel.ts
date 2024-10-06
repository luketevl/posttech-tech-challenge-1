import { SCHEMA } from 'src/config/Database.ts';
import Order from '../../domain/Order.ts';
import { Model, column, model } from './ORM.ts';

@model(SCHEMA, 'order')
export default class OrderModel extends Model {
  @column('order_id', true)
  orderId: string;
  @column('car_id')
  carId: string;
  @column('total', false, 'number')
  total: number;
  @column('cpf')
  cpf: string;
  @column('create_at')
  createAt: Date;

  constructor(
    orderId: string,
    carId: string,
    cpf: string,
    total: number,        
    createAt: Date       
  ) {
    super();
    this.orderId = orderId;
    this.carId = carId;
    this.total = total;
    this.cpf = cpf;
    this.createAt = createAt;
  }

  getAggregate() {
    return new Order(
      this.orderId,
      this.carId,
      this.cpf,
      this.total,
      this.createAt,
    );
  }

  static getModelFromAggregate(car: Order) {
    return new OrderModel(
      car.orderId,
      car.carId,
      car.cpf,
      car.total,
      car.createAt,
    );
  }
}
