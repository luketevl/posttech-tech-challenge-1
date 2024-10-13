import crypto from 'node:crypto';

export default class EntityHistory {
  constructor(
    readonly entityHistoryId: string,
    readonly entityId: string,
    readonly data: string,
    readonly createAt: Date,
  ) {
  }

  static create(
    entityId: string,
    data: string,
  ) {
    const id = crypto.randomUUID();
    return new EntityHistory(id, entityId, data, new Date());
  }
}
