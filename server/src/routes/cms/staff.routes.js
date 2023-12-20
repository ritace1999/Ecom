import express from "express";
import staffsController from "../../controllers/cms/staff.controller.js";

const router = express.Router();

router.route("/").get(staffsController.index).post(staffsController.create);

router
  .route("/:id")
  .get(staffsController.readByID)
  .put(staffsController.update)
  .patch(staffsController.update)
  .delete(staffsController.deleteById);

export default router;
