import db from "../db";
import SqlRepository from "./sql-repository";
import ContactRepository from "./contact-repository";

export const sqlRepository = new SqlRepository(db);
export const contactRepository = new ContactRepository(db);
