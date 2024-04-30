import StringUtils from "../utils/string-utils";
import BaseService from "../services/base-service";
import asyncHandler from "express-async-handler";
import BaseRepository from "../repositories/base-repository";
import { Logger } from "winston";
import { Severity } from "../enums/severity-enum";
import { getLogger } from "../logging";
import EmailUtils from "../utils/email-utils";

abstract class BaseController<T, S extends BaseService<T, BaseRepository<T>>> {
  protected service: S;
  protected logger: Logger;

  constructor(service: S) {
    this.service = service;
    this.logger = getLogger(module);
  }

  create = asyncHandler(async (req, res) => {
    const requestPayload = req.body;
    this.logger.info(
      `Creating with request payload ${JSON.stringify(requestPayload)}`
    );
    const entity = await this.service.create(requestPayload);
    res.json({
      message: `${StringUtils.capitalize(
        this.service.getEntityName().singular
      )} was created`,
      severity: Severity.Success,
      [`${this.service.getEntityName().singular}`]: entity,
    });
  });

  getAll = asyncHandler(async (_req, res) => {
    this.logger.info(`Getting all ${this.service.getEntityName().plural}`);
    const entities = await this.service.getAll();
    res.json({ [`${this.service.getEntityName().plural}`]: entities });
  });

  getById = asyncHandler(async (req, res) => {
    this.logger.info(`Getting by id ${this.service.getEntityName().singular}`);
    const id = req.params.id;
    const entity = await this.service.getById(id);
    res.json({ [`${this.service.getEntityName().singular}`]: entity });
  });

  deleteAll = asyncHandler(async (_req, res) => {
    this.logger.info(`Deleting all ${this.service.getEntityName().plural}`);
    const count = await this.service.deleteAll();
    res.json({
      message: `A number of ${count} ${
        this.service.getEntityName().plural
      } have been deleted!`,
      severity: Severity.Success,
    });
  });

  deleteById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    this.logger.info(
      `Deleting ${this.service.getEntityName().singular} by id ${id}`
    );
    await this.service.deleteById(id);
    res.json({
      message: `${StringUtils.capitalize(
        this.service.getEntityName().singular
      )} has been deleted`,
      severity: Severity.Success,
    });
  });

  updateById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    this.logger.info(
      `Updating ${this.service.getEntityName().singular} by id ${id}`
    );
    const data = req.body;
    const entity = await this.service.updateById(id, data);
    res.json({
      message: `${StringUtils.capitalize(
        this.service.getEntityName().singular
      )} has been updated!`,
      severity: Severity.Success,
      entity,
    });
  });

  deleteAllSelected = asyncHandler(async (req, res) => {
    const ids = await this.service.deleteAllSelected(req.body.ids);
    this.logger.info(
      `Deleting all ${this.service.getEntityName().plural} with ids ${ids}`
    );
    res.json({
      message: `${StringUtils.capitalize(
        this.service.getEntityName().plural
      )} have been deleted`,
      severity: Severity.Success,
      ids,
    });
  });
}

export default BaseController;
