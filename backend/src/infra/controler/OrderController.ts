import type CreateOrder from 'src/application/useCase/Order/CreateOrder.ts';
import type HttpServer from '../http/HttpServer.ts';

export default class OrderController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly createOrder: CreateOrder,
  ) {
    this.httpServer.register(
      'post',
      '/order',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      async (_params: unknown, body: any) => {
        const input = body;
        console.log('Order Input', input);
        const output = await this.createOrder.execute(input);
        return output;
      },
    );
  }
}
