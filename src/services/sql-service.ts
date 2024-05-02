import ContactService from "./contact-service";

class SqlService {
  private contactService: ContactService;

  constructor(contactService: ContactService) {
    this.contactService = contactService;
  }

  async createTables(): Promise<void> {
    await this.contactService.createTable();
  }

  async dropTables():Promise<void>{
    await this.contactService.dropTable()
  }
}

export default SqlService;
