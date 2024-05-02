import { Router } from "express";
import { sqlController } from "../controllers";

const router: Router = Router();

const { createTables, dropTables } = sqlController;

router.post("/create-tables", createTables);
router.delete("/drop-tables", dropTables);

export default router;
