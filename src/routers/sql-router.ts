import { Router } from "express";
import { sqlController } from "../controllers";

const router: Router = Router();

const { createTables, dropTables, createExtensionUuid, dropExtensionUuid } =
  sqlController;

router.post("/create-tables", createTables);
router.delete("/drop-tables", dropTables);
router.post("/create-extension-uuid", createExtensionUuid);
router.delete("/drop-extension-uuid", dropExtensionUuid);

export default router;
