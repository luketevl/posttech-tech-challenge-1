import pgp from 'pg-promise';

import { HOST, PASSWORD, PORT, USER } from 'src/config/Database.ts';
import type DatabaseConnection from './DatabaseConnection.ts';

export default class PgPromiseAdapter implements DatabaseConnection {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  connection: any;

  constructor() {
    this.connection = pgp()(
      `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/app`,
    );
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  query(statement: string, params: any) {
    return this.connection.query(statement, params);
  }

  close() {
    return this.connection.$pool.end();
  }
}
