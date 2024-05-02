import SqlService from "./sql-service";
import ContactService from "./contact-service";
import { contactRepository } from "../repositories";

export const contactService = new ContactService(contactRepository);
export const sqlService = new SqlService(contactService);
