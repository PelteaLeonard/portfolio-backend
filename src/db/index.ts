import { Pool } from "pg";

const isProduction = process.env.NODE_ENV === "production";

export default new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});
