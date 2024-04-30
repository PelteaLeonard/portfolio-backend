import ContactService from "./contact-service";
import { contactRepository } from "../repositories";

export const contactService = new ContactService(contactRepository);
