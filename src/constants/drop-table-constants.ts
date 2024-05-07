import { Table } from "./table-constants";

const DROP_TABLE_CONTACTS = "DROP TABLE IF EXISTS contacts";

export const dropTable: Record<Table, string> = {
  [Table.Contacts]: DROP_TABLE_CONTACTS,
};
