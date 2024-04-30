import ContactController from "./contact-controller";
import { contactService } from "../services";

export const contactController = new ContactController(contactService);
