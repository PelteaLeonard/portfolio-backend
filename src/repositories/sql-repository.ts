import { Pool } from "pg";
import { Logger } from "winston";
import { getLogger } from "../logging";
import { CREATE_EXTENSION_UUID } from "../constants/sql-contacts";

class SqlRepository {
  private db: Pool;
  private logger: Logger;

  constructor(db: Pool) {
    this.db = db;
    this.logger = getLogger(module);
  }

  async createExtensionUuid(): Promise<void> {
    this.logger.info("Creating extension UUID OSSP");
    await this.db.query(CREATE_EXTENSION_UUID);
  }

  async dropExtensionUuid(): Promise<void> {
    this.logger.info('Dropping extension "uuid-ossp"');
    await this.db.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
export default SqlRepository;
