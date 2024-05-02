import SqlController from "./sql-controller";
import ContactController from "./contact-controller";
import { contactService, sqlService } from "../services";

export const contactController = new ContactController(contactService);
export const sqlController = new SqlController(sqlService);
