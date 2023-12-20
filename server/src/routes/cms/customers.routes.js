import express from "express";
import customersController from "../../controllers/cms/customers.controller.js";

const router = express.Router();

router
  .route("/")
  .get(customersController.read)
  .post(customersController.create);

router
  .route("/:id")
  .get(customersController.readByID)
  .put(customersController.update)
  .patch(customersController.update)
  .delete(customersController.deleteById);

export default router;
