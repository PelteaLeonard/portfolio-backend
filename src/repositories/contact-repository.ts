import ObjectUtils from "../utils/object-utils";
import BaseRepository from "./base-repository";
import { Contact } from "../types/contact-types";
import { createTable } from "../constants/create-table-constants";

class ContactRepository extends BaseRepository<Contact> {
  protected tableName = "contacts";
  protected entityName = { singular: "contact", plural: "contacts" };

  async createTable(): Promise<void> {
    await this.db.query(createTable.contacts);
  }

  async findAllByFirstName(firstName: string): Promise<Contact[]> {
    this.logger.info(
      `Finding ${this.entityName.plural} by first name from table ${this.tableName}`
    );

    const query = `SELECT * FROM ${this.tableName} where first_name = $1`;

    const values = [firstName];

    const { rows } = await this.db.query(query, values);

    return rows.map((row) => ObjectUtils.objectKeysToCamelCase(row) as Contact);
  }

  async findAllByLastName(lastName: string): Promise<Contact[]> {
    this.logger.info(
      `Finding ${this.entityName.plural} by last name from table ${this.tableName}`
    );

    const query = `SELECT * FROM ${this.tableName} where last_name = $1`;

    const values = [lastName];

    const { rows } = await this.db.query(query, values);

    return rows.map((row) => ObjectUtils.objectKeysToCamelCase(row) as Contact);
  }

  async findByEmail(email: string): Promise<Contact | null> {
    this.logger.info(
      `Finding ${this.entityName.singular} by email from table ${this.tableName}`
    );

    const query = `SELECT * FROM ${this.tableName} where email = $1`;

    const values = [email];

    const { rows } = await this.db.query(query, values);

    return rows.length > 0
      ? (ObjectUtils.objectKeysToCamelCase(rows[0]) as Contact)
      : null;
  }

  async findByMessage(message: string): Promise<Contact[]> {
    this.logger.info(
      `Finding ${this.entityName.singular} by message from table ${this.tableName}`
    );

    const query = `SELECT * FROM ${this.tableName} where message = $1`;

    const values = [message];

    const { rows } = await this.db.query(query, values);

    return rows.map((row) => ObjectUtils.objectKeysToCamelCase(row) as Contact);
  }

  async deleteAllByFirstName(firstName: string): Promise<number> {
    this.logger.info(
      `Deleting ${this.entityName.plural} by first name ${firstName} from table ${this.tableName}`
    );

    const query = `DELETE  FROM ${this.tableName} WHERE first_name = $1`;

    const values = [firstName];

    const { rowCount } = await this.db.query(query, values);

    return rowCount || 0;
  }

  async deleteAllByLastName(lastName: string): Promise<number> {
    this.logger.info(
      `Deleting ${this.entityName.plural} by last name ${lastName} from table ${this.tableName}`
    );

    const query = `DELETE  FROM ${this.tableName} WHERE last_name = $1`;

    const values = [lastName];

    const { rowCount } = await this.db.query(query, values);

    return rowCount || 0;
  }

  async deleteByEmail(email: string): Promise<boolean> {
    this.logger.info(
      `Deleting ${this.entityName.singular} by email from table ${this.tableName}`
    );

    const query = `DELETE FROM ${this.tableName} WHERE email = $1`;

    const values = [email];

    const { rowCount } = await this.db.query(query, values);

    return rowCount ? rowCount === 1 : false;
  }

  async deleteByMessage(message: string): Promise<number> {
    this.logger.info(
      `Deleting ${this.entityName.singular} by message from table ${this.tableName}`
    );

    const query = `DELETE FROM ${this.tableName} WHERE message = $1`;

    const values = [message];

    const { rowCount } = await this.db.query(query, values);

    return rowCount || 0;
  }
}

export default ContactRepository;
