import { SCHEMA } from 'src/config/Database.ts';
import { Model, column, model } from './ORM.ts';
import EntityHistory from 'src/domain/entity/EntityHistory.ts';

@model(SCHEMA, 'entity_history')
export default class EntityHistoryModel extends Model {
  @column('entity_history_id', true)
  entityHistoryId: string;
  @column('entity_id')
  entityId: string;
  @column('data')
  data: string;
  @column('create_at')
  createAt: Date;

  constructor(
    entityHistoryId: string,
    entityId: string,
    data: string,
    createAt: Date       
  ) {
    super();
    this.entityHistoryId = entityHistoryId;
    this.entityId = entityId;
    this.data = data;
    this.createAt = createAt;
  }

  getAggregate() {
    return new EntityHistory(
      this.entityHistoryId,
      this.entityId,
      this.data,
      this.createAt,
    );
  }

  static getModelFromAggregate(history: EntityHistory) {
    return new EntityHistoryModel(
      history.entityHistoryId,
      history.entityId,
      history.data,
      history.createAt,
    );
  }
}
