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
  async update(field: string, value: any, model: Model) {
    const set = model.columns
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      .map((column: any, index: number) => `${column.column}=$${index + 1}`)
      .join(',');
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const values = model.columns.map((column: any) => model[column.property]);
    values.push(value);
    const query = `UPDATE ${model.schema}.${model.table} set ${set} WHERE ${field} = $${values.length}`;
    await this.databaseConnection.query(query, values);
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async get(field: string, value: any, model: any) {
    const query = `select * from ${model.prototype.schema}.${model.prototype.table} where ${field} = $1`;
    const [data] = await this.databaseConnection.query(query, value);
    if (!data) return null;
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
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async getAll(field: string, value: any, order: string, model: any) {
    const orderBy = order.length ? `ORDER BY ${order}` : '';
    const query = `select * from ${model.prototype.schema}.${model.prototype.table} where ${field} = $1 ${orderBy}`;
    console.log(query);
    const data = await this.databaseConnection.query(query, value);
    if (!data) return []; 
    console.log(4444, data)
   
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return data.map((item: any) => {
      const obj = new model();
      for (const column of model.prototype.columns) {
        if (column.type === 'number') {
          console.log(column)
          obj[column.property] = Number.parseFloat(item[column.column]);
        } else {
          obj[column.property] = item[column.column];
        }
      }
      return obj;
    });
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async list(model: any) {
    const query = `select * from ${model.prototype.schema}.${model.prototype.table}`;
    return this.databaseConnection.query(query, {});
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async delete(field: string, value: any, model: any) {
    const query = `DELETE FROM ${model.prototype.schema}.${model.prototype.table} where ${field} = $1`;
    await this.databaseConnection.query(query, value);
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

export function column(column: string, pk = false, type = 'string') {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (target: any, propertyKey: string) => {
    if (!target.columns) {
      target.columns = [];
    }
    target.columns.push({ column, property: propertyKey, pk, type });
  };
}
