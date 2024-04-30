import db from "../db";
import ContactRepository from "./contact-repository";

export const contactRepository = new ContactRepository(db);
