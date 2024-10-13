import type CreateCar from 'src/application/useCase/Car/CreateCar.ts';
import type DeleteCar from 'src/application/useCase/Car/DeleteCar.ts';
import type GetCar from 'src/application/useCase/Car/GetCar.ts';
import type ListCars from 'src/application/useCase/Car/ListCars.ts';
import type UpdateCar from 'src/application/useCase/Car/UpdateCar.ts';
import { CAR_STATUS } from 'src/config/Status.ts';
import type HttpServer from '../http/HttpServer.ts';

export default class CarController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly createCar: CreateCar,
    private readonly updateCar: UpdateCar,
    private readonly deleteCar: DeleteCar,
    private readonly getCar: GetCar,
    private readonly listCars: ListCars,
  ) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.httpServer.register('post', '/car', async (_params: unknown, body: any) => {
      const input = body;
      const output = await this.createCar.execute(input);
      return output;
    });
    this.httpServer.register(
      'get',
      '/car/:{carId}',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      async (params: any, _body: any) => {
        const { carId } = params;
        if(!carId) throw new Error('Car id is required');
        const output = await this.getCar.execute(carId);
        return output;
      },
    );

    this.httpServer.register(
      'get',
      '/car/status/:{status}',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      async (params: any, _body: any) => {
        const { status } = params;
        const output = await this.listCars.execute(status);
        return output;
      },
    );
    this.httpServer.register(
      'patch',
      '/car/:{carId}',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      async (params: any, body: any) => {
        const input = body;
        const { carId } = params;
        const output = await this.updateCar.execute({ ...input, carId });
        return output;
      },
    );

    this.httpServer.register(
      'delete',
      '/car/:{carId}',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      async (params: any, _body: any) => {
        const { carId } = params;
        const output = await this.deleteCar.execute(carId);
        return output;
      },
    );
  }
}
