import crypto from 'node:crypto';

export default class Car {
  constructor(
    readonly carHistoryId: string,
    readonly car: Car,
    readonly createAt: Date,
  ) {
  }

  static create(
    car: Car,
  ) {
    const carHistoryId = crypto.randomUUID();
    return new Car(carHistoryId, car, new Date());
  }
}
