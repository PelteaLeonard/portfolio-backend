import { Router } from "express";
import { contactController } from "../controllers";

const router: Router = Router();

const {
  create,
  getAll,
  getById,
  getAllByFirstName,
  getAllByLastName,
  getByEmail,
  getByMessage,
  updateById,
  deleteAll,
  deleteById,
  deleteAllSelected,
  deleteAllByFirstName,
  deleteAllByLastName,
  deleteByEmail,
  deleteByMessage,
} = contactController;

router.post("", create);
router.get("", getAll);
router.get("/:id", getById);
router.get("/first-name/:firstName", getAllByFirstName);
router.get("/last-name/:lastName", getAllByLastName);
router.get("/email/:email", getByEmail);
router.get("/message/:message", getByMessage);
router.put("/:id", updateById);
router.delete("", deleteAll);
router.delete("/selected", deleteAllSelected);
router.delete("/:id", deleteById);
router.delete("/first-name/:firstName", deleteAllByFirstName);
router.delete("/last-name/:lastName", deleteAllByLastName);
router.delete("/email/:email", deleteByEmail);
router.delete("/message/:message", deleteByMessage);

export default router;
