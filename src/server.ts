import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import cors from "cors";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import sqlRouter from "./routers/sql-router";
import contactRouter from "./routers/contact-router";

import { Application } from "express";

const app: Application = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "https://portfolio-frontend-six-snowy.vercel.app",
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/api/contacts", contactRouter);
app.use("/sql", sqlRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
