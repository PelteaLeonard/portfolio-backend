import BaseRepository from "../repositories/base-repository";
import { Logger } from "winston";
import { getLogger } from "../logging";

abstract class BaseService<T, R extends BaseRepository<T>> {
  protected repository: R;
  protected logger: Logger;

  constructor(repository: R) {
    this.repository = repository;
    this.logger = getLogger(module);
  }

  abstract createTable(): void;

  getEntityName(): { singular: string; plural: string } {
    return this.repository.getEntityName();
  }

  async getAll(): Promise<T[]> {
    this.logger.info(`Getting all ${this.getEntityName().plural}`);
    return this.repository.findAll();
  }

  async getById(id: string): Promise<T | null> {
    this.logger.info(`Getting ${this.getEntityName().singular} by id ${id}`);
    return this.repository.findById(id);
  }

  async deleteAll(): Promise<number> {
    this.logger.info(`Deleting all ${this.repository.getEntityName().plural}`);
    return this.repository.deleteAll();
  }

  async deleteById(id: string): Promise<boolean> {
    this.logger.info(
      `Deleting ${this.repository.getEntityName().singular} by id ${id}`
    );
    return this.repository.deleteById(id);
  }

  async updateById(id: string, data: Partial<T>): Promise<T | null> {
    this.logger.info(
      `Updating ${
        this.repository.getEntityName().singular
      } by id ${id} with data ${data}`
    );
    return this.repository.updateById(id, data);
  }

  async deleteAllSelected(ids: string[]): Promise<string[]> {
    this.logger.info(
      `Deleting ${this.repository.getEntityName().plural} by ids ${ids.join(
        ", "
      )} selected `
    );
    return this.repository.deleteAllSelected(ids);
  }

  async create(data: Partial<T>): Promise<T> {
    this.logger.info(
      `Creating ${
        this.repository.getEntityName().singular
      } with data ${JSON.stringify(data)}`
    );
    return this.repository.save(data);
  }
}

export default BaseService;
