export default interface DatabaseConnection {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  query(statement: string, params: any): Promise<any>;
  close(): Promise<void>;
}
