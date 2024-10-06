import Cpf from './valueObject/Cpf.ts';
import crypto from 'node:crypto';
export default class Order {
  constructor(
    readonly orderId: string,
    readonly carId: string,
    readonly cpf: string,
    readonly total: number,
    readonly createAt: Date,
  ) {}
  static create(carId: string, total: number, document: string) {
    const orderId = crypto.randomUUID();
    const date = new Date();
    const cpf = new Cpf(document);
    return new Order(orderId, carId, cpf.getValue(), total, date);
  }
}
