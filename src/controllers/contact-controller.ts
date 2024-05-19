import StringUtils from "../utils/string-utils";
import asyncHandler from "express-async-handler";
import ContactService from "../services/contact-service";
import BaseController from "./base-controller";
import { Contact } from "../types/contact-types";
import { Severity } from "../enums/severity-enum";

class ContactController extends BaseController<Contact, ContactService> {
  constructor(service: ContactService) {
    super(service);
  }

  create = asyncHandler(async (req, res) => {
    const requestPayload = req.body;
    this.logger.info(
      `Creating contact with request payload ${JSON.stringify(requestPayload)}`
    );
    const contact = await this.service.create(requestPayload);
    res.json({
      message: `Your message has been sent to Leonard!`,
      severity: Severity.Success,
      contact,
    });
  });

  getAllByFirstName = asyncHandler(async (req, res) => {
    const firstName = req.params.firstName;

    const entities = await this.service.getAllByFirstName(firstName);
    res.json({ [`${this.service.getEntityName().plural}`]: entities });
  });

  getAllByLastName = asyncHandler(async (req, res) => {
    const lastName = req.params.lastName;
    this.logger.info(
      `Getting all ${
        this.service.getEntityName().plural
      } by last name ${lastName}`
    );
    const entities = await this.service.getAllByLastName(lastName);
    res.json({ [`${this.service.getEntityName().plural}`]: entities });
  });

  getByEmail = asyncHandler(async (req, res) => {
    const email = req.params.email;
    this.logger.info(
      `Getting  ${this.service.getEntityName().singular} by email ${email}`
    );
    const entity = await this.service.getByEmail(email);
    res.json({ [`${this.service.getEntityName().singular}`]: entity });
  });

  getByMessage = asyncHandler(async (req, res) => {
    const message = req.params.message;
    const entity = await this.service.getByMessage(message);
    res.json({ [`${this.service.getEntityName().singular}`]: entity });
  });

  deleteAllByFirstName = asyncHandler(async (req, res) => {
    const firstName = req.params.firstName;
    const count = await this.service.deleteAllByFirstName(firstName);
    res.json({
      message: `A number of ${count} ${
        this.service.getEntityName().plural
      } have been deleted!`,
      severity: Severity.Success,
    });
  });

  deleteAllByLastName = asyncHandler(async (req, res) => {
    const lastName = req.params.lastName;
    const count = await this.service.deleteAllByLastName(lastName);
    res.json({
      message: `A number of ${count} ${
        this.service.getEntityName().plural
      } have been deleted!`,
      severity: Severity.Success,
    });
  });

  deleteByEmail = asyncHandler(async (req, res) => {
    const email = req.params.email;
    await this.service.deleteByEmail(email);
    res.json({
      message: `${StringUtils.capitalize(
        this.service.getEntityName().singular
      )} with email ${email} has been deleted!`,
      severity: Severity.Success,
    });
  });

  deleteByMessage = asyncHandler(async (req, res) => {
    const message = req.params.message;
    await this.service.deleteByMessage(message);
    res.json({
      message: `A number of ${
        this.service.getEntityName().plural
      } with message ${message} have been deleted!`,
      severity: Severity.Success,
    });
  });
}

export default ContactController;
