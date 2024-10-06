import { MAX_YEARS } from 'src/config/App.ts';

export default class CarYear {
  private value: string;

  constructor(year: string) {
    if (year && year.length !== MAX_YEARS && !RegExp(/\d{4}/).exec(year))
      throw new Error('Invalid car year');
    this.value = year;
  }

  getValue() {
    return this.value;
  }
}
