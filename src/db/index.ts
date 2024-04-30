import { Pool } from "pg";

export default new Pool({
  user: "postgres",
  host: "localhost",
  database: "portfolio",
  password: "test123",
  port: 5432,
});
