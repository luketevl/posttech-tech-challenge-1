import pgp from 'pg-promise';

import DatabaseConnection from './DatabaseConnection.ts';
import { HOST, PASSWORD, PORT, USER } from 'src/config/Database.ts';

export default class PgPromiseAdapter implements DatabaseConnection {
  connection: any;

  constructor() {
    this.connection = pgp()(
      `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/app`,
    );
  }

  query(statement: string, params: any) {
    return this.connection.query(statement, params);
  }

  close() {
    return this.connection.$pool.end();
  }
}
