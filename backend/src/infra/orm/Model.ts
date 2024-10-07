export abstract class Model {
  schema!: string;
  table!: string;
  columns!: { column: string; property: string; pk: boolean; type: string }[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [property: string]: any;
}

export function model(schema: string, table: string) {
  console.log(5555, schema, table);
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
