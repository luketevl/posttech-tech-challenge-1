import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import HttpServer from './HttpServer.ts';

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  register(method: string, url: string, callback: Function): void {
    this.app[method](url.replace(/\{|\}/g, ''), async (req: any, res: any) => {
      try {
        const output = await callback(req.params, req.body);
        res.json(output);
      } catch (e: any) {
        res.status(422).json({
          message: e.message,
        });
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
