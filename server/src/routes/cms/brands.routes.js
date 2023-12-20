import express from "express";
import brandsController from "../../controllers/cms/brands.controller.js";

const router = express.Router();

router.route("/").get(brandsController.read).post(brandsController.create);

router
  .route("/:id")
  .get(brandsController.readByID)
  .put(brandsController.update)
  .patch(brandsController.update)
  .delete(brandsController.deleteById);

export default router;
