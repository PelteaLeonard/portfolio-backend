import SqlService from "../services/sql-service";
import asyncHandler from "express-async-handler";
import { Severity } from "../enums/severity-enum";

class SqlController {
  private sqlService: SqlService;

  constructor(sqlService: SqlService) {
    this.sqlService = sqlService;
  }

  createTables = asyncHandler(async (_req, res) => {
    await this.sqlService.createTables();
    res.json({
      message: "Tables have been created",
      severity: Severity.Success,
    });
  });

  dropTables = asyncHandler(async (_req, res) => {
    await this.sqlService.dropTables();
    res.json({
      message: "Tables have been deleted",
      severity: Severity.Success,
    });
  });

  createExtensionUuid = asyncHandler(async (_req, res) => {
    await this.sqlService.createExtensionUuid();
    res.json({
      message: "Extension uuid have been created",
      severity: Severity.Success,
    });
  });

  dropExtensionUuid = asyncHandler(async (_req, res) => {
    await this.sqlService.dropExtensionUuid();
    res.json({
      message: "Extension uuid have been dropped",
      severity: Severity.Success,
    });
  });
}

export default SqlController;
