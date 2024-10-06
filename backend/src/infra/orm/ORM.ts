import type DatabaseConnection from '../database/DatabaseConnection.ts';

export default class ORM {
  constructor(readonly databaseConnection: DatabaseConnection) {}

  async save(model: Model) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const columns = model.columns.map((column: any) => column.column).join(',');
    const params = model.columns
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      .map((_column: any, index: number) => `$${index + 1}`)
      .join(',');
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const values = model.columns.map((column: any) => model[column.property]);
    const query = `insert into ${model.schema}.${model.table} (${columns}) values (${params})`;
    await this.databaseConnection.query(query, values);
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async get(field: string, value: any, model: any) {
    const query = `select * from ${model.prototype.schema}.${model.prototype.table} where ${field} = $1`;
    const [data] = await this.databaseConnection.query(query, value);
    const obj = new model();
    for (const column of model.prototype.columns) {
      if (column.type === 'number') {
        obj[column.property] = Number.parseFloat(data[column.column]);
      } else {
        obj[column.property] = data[column.column];
      }
    }
    return obj;
  }
}

export abstract class Model {
  schema!: string;
  table!: string;
  columns!: { column: string; property: string; pk: boolean; type: string }[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [property: string]: any;
}

export function model(schema: string, table: string) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (target: any) => {
    target.prototype.schema = schema;
    target.prototype.table = table;
  };
}

export function column(
  column: string,
  pk = false,
  type = 'string',
) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (target: any, propertyKey: string) => {
    if (!target.columns) {
      target.columns = [];
    }
    target.columns.push({ column, property: propertyKey, pk, type });
  };
}
