import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import type HttpServer from './HttpServer.ts';

export default class ExpressAdapter implements HttpServer {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  register(method: string, url: string, callback: Function): void {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.app[method](url.replace(/\{|\}/g, ''), async (req: any, res: any) => {
      try {
        const output = await callback(req.params, req.body);
        res.json(output);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (e: any) {
        res.status(422).json({
          message: e.message,
        });
      }
    });
  }

  listen(port: number | string): void {
    this.app.listen(port, () => console.log(`listening on port ${port}` ));
  }
}
