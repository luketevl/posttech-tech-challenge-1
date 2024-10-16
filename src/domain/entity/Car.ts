import crypto from 'node:crypto';
import { CAR_STATUS } from 'src/config/Status.ts';
import CarYear from '../valueObject/CarYear.ts';
export default class Car {
  public year: CarYear;
  private oldValue: Car | null = null;

  constructor( 
    readonly carId: string,
    readonly price: number,
    public status: keyof typeof CAR_STATUS,
    readonly brand: string,
    readonly model: string,
    readonly color: string,
    readonly createAt: Date,
    public updateAt: Date,
    year: string,
  ) {
    if(status !== CAR_STATUS.AVAILABLE && status !== CAR_STATUS.SOLD) throw new Error('Invalid status')
    this.year = new CarYear(year);
  }

  static create(
    price: number,
    status: keyof typeof CAR_STATUS,
    brand: string,
    model: string,
    color: string,
    year: string,
  ) {
    const carId = crypto.randomUUID();
    return new Car(carId, price, status, brand, model, color, new Date(), new Date(), year);
  }

  sell(){
    if (this.status === CAR_STATUS.SOLD) {
      throw new Error('Car already sold');
    }
    this.status = CAR_STATUS.SOLD;
    this.updateAt = new Date();
  }
  getOlderValue(){
    return this.oldValue
  }
  setOlderValue(oldValue: Car){
    this.oldValue = oldValue
  }
}
