import type EntityHistory from 'src/domain/entity/EntityHistory.ts';
import EntityHistoryModel from '../orm/EntityHistoryModel.ts';
import type ORM from '../orm/ORM.ts';

export default class EntityHistoryRepository implements EntityHistoryRepository {
  constructor(private readonly orm: ORM) {}
  async save(history: EntityHistory): Promise<void> {
    this.orm.save(EntityHistoryModel.getModelFromAggregate(history));
  }
}
