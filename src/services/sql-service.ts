import SqlRepository from "../repositories/sql-repository";
import ContactService from "./contact-service";

class SqlService {
  private contactService: ContactService;
  private sqlRepository: SqlRepository;

  constructor(contactService: ContactService, sqlRepository: SqlRepository) {
    this.contactService = contactService;
    this.sqlRepository = sqlRepository;
  }

  async createTables(): Promise<void> {
    await this.contactService.createTable();
  }

  async dropTables(): Promise<void> {
    await this.contactService.dropTable();
  }

  async createExtensionUuid(): Promise<void> {
    await this.sqlRepository.createExtensionUuid();
  }

  async dropExtensionUuid(): Promise<void> {
    await this.sqlRepository.dropExtensionUuid();
  }
}

export default SqlService;
