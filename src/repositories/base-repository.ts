import ObjectUtils from "../utils/object-utils";
import { Pool } from "pg";
import { Logger } from "winston";
import { getLogger } from "../logging";

abstract class BaseRepository<T> {
  protected db: Pool;
  protected logger: Logger;
  protected abstract tableName: string;
  protected abstract entityName: { singular: string; plural: string };

  constructor(db: Pool) {
    this.db = db;
    this.logger = getLogger(module);
  }

  abstract createTable(): Promise<void>;

  getEntityName(): { singular: string; plural: string } {
    return this.entityName;
  }

  async save(data: Partial<T>): Promise<T> {
    this.logger.info(
      `Saving ${this.entityName.singular} in table ${this.tableName}`
    );

    data = ObjectUtils.objectKeysToSnakeCase(data) as Partial<T>;

    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map((_, index) => `$${index + 1}`).join(", ");

    const query = `
        INSERT INTO ${this.tableName} (${fields.join(", ")})
        VALUES (${placeholders})
        RETURNING *;
    `;

    const result = await this.db.query(query, values);

    return ObjectUtils.objectKeysToCamelCase(result.rows[0]) as T;
  }

  async findAll(): Promise<T[]> {
    this.logger.info(
      `Finding all ${this.entityName.plural} from table ${this.tableName}`
    );

    const query = `SELECT * FROM ${this.tableName}`;

    const result = await this.db.query(query);

    return result.rows.map(
      (row) => ObjectUtils.objectKeysToCamelCase(row) as T
    );
  }

  async findById(id: string): Promise<T | null> {
    this.logger.info(
      `Finding ${this.entityName.singular} by id from table ${this.tableName}`
    );

    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;

    const values = [id];

    const result = await this.db.query(query, values);

    return result.rows.length > 0
      ? (ObjectUtils.objectKeysToCamelCase(result.rows[0]) as T)
      : null;
  }

  async deleteAll(): Promise<number> {
    this.logger.info(
      `Deleting all ${this.entityName.plural} from table ${this.tableName}`
    );

    const query = `DELETE FROM ${this.tableName}`;

    const { rowCount } = await this.db.query(query);

    return rowCount || 0;
  }

  async deleteById(id: string): Promise<boolean> {
    this.logger.info(
      `Deleting ${this.entityName.singular} by id from table ${this.tableName}`
    );

    const query = `DELETE FROM ${this.tableName} WHERE id = $1`;

    const values = [id];

    const { rowCount } = await this.db.query(query, values);

    return rowCount ? rowCount === 1 : false;
  }

  async updateById(id: string, data: Partial<T>): Promise<T | null> {
    this.logger.info(
      `Updating ${this.entityName.singular} by id from table ${
        this.tableName
      } with data ${JSON.stringify(data)}`
    );

    if (Object.keys(data).length === 0) {
      return this.findById(id);
    }

    data = ObjectUtils.objectKeysToSnakeCase(data) as Partial<T>;

    const entries = Object.entries(data);

    const setClause = entries
      .map(([key, _], index) => `${key} = $${index + 2}`)
      .join(", ");

    const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = $1`;

    await this.db.query(query, [id, ...entries.map(([_key, value]) => value)]);

    return this.findById(id);
  }

  async deleteAllSelected(ids: string[]): Promise<string[]> {
    this.logger.info(
      `Deleting all selected ${this.entityName.plural} by ids ${ids.join(
        ", "
      )} from table ${this.tableName}`
    );

    const query = `DELETE FROM ${this.tableName} WHERE id = ANY($1) RETURNING id;`;

    const result = await this.db.query(query, [ids]);

    return result.rows.map((row) => row.id);
  }
}

export default BaseRepository;
