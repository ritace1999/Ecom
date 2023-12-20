import express from "express";
import productsController from "../../controllers/cms/products.controller.js";
import { upload } from "../../lib/functions.js";

const router = express.Router();

router
  .route("/")
  .get(productsController.read)
  .post(upload.array("images"), productsController.create);

router
  .route("/:id")
  .get(productsController.readByID)
  .put(upload.array("images"), productsController.update)
  .patch(upload.array("images"), productsController.update)
  .delete(productsController.deleteById);

export default router;
