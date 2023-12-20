import express from "express";
import categoriesController from "../../controllers/cms/categories.controller.js";

const router = express.Router();

router
  .route("/")
  .get(categoriesController.read)
  .post(categoriesController.create);

router
  .route("/:id")
  .get(categoriesController.readByID)
  .put(categoriesController.update)
  .patch(categoriesController.update)
  .delete(categoriesController.deleteById);

export default router;
