import { Table } from "./table-constants";

const CREATE_TABLE_CONTACTS = `
    CREATE TABLE IF NOT EXISTS contacts(
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        message VARCHAR(1000) 
    )
`;

export const createTable: Record<Table, string> = {
  [Table.Contacts]: CREATE_TABLE_CONTACTS,
};
