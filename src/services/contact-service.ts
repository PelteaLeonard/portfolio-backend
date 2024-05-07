import EmailUtils from "../utils/email-utils";
import BaseService from "./base-service";
import ContactRepository from "../repositories/contact-repository";
import { Contact } from "../types/contact-types";

class ContactService extends BaseService<Contact, ContactRepository> {
  constructor(repository: ContactRepository) {
    super(repository);
  }

  async create(data: Partial<Contact>): Promise<Contact> {
    const contact = await super.create(data);
    await EmailUtils.sendContactEmail(contact.email, contact);
    return contact;
  }

  async createTable(): Promise<void> {
    return this.repository.createTable();
  }

  async dropTable(): Promise<void> {
    return this.repository.dropTable();
  }

  async getAllByFirstName(firstName: string): Promise<Contact[]> {
    this.logger.info(
      `Getting ${this.getEntityName().plural} by first name ${firstName}`
    );
    return this.repository.findAllByFirstName(firstName);
  }

  async getAllByLastName(lastName: string): Promise<Contact[]> {
    this.logger.info(
      `Getting ${this.getEntityName().plural} by last name ${lastName}`
    );
    return this.repository.findAllByLastName(lastName);
  }

  async getByEmail(email: string): Promise<Contact | null> {
    this.logger.info(
      `Getting ${this.getEntityName().singular} by email ${email}`
    );
    return this.repository.findByEmail(email);
  }

  async getByMessage(message: string): Promise<Contact[]> {
    this.logger.info(
      `Getting ${this.getEntityName().singular} by message ${message}`
    );
    return this.repository.findByMessage(message);
  }

  async deleteAllByFirstName(firstName: string): Promise<number> {
    this.logger.info(
      `Deleting ${this.getEntityName().plural} by first name ${firstName}`
    );
    return this.repository.deleteAllByFirstName(firstName);
  }

  async deleteAllByLastName(lastName: string): Promise<number> {
    this.logger.info(
      `Deleting ${this.getEntityName().plural} by last name ${lastName}`
    );
    return this.repository.deleteAllByLastName(lastName);
  }

  async deleteByEmail(email: string): Promise<boolean> {
    this.logger.info(
      `Deleting ${this.getEntityName().singular} by email ${email}`
    );
    return this.repository.deleteByEmail(email);
  }

  async deleteByMessage(message: string): Promise<number> {
    this.logger.info(
      `Deleting ${this.getEntityName().singular} by message ${message}`
    );
    return this.repository.deleteByMessage(message);
  }
}

export default ContactService;
