import type EntityHistory from "src/domain/entity/EntityHistory.ts";

export default interface EntityHistoryRepository {
  save(entity: EntityHistory): Promise<void>;
}
