import express from "express";
import productsController from "../../controllers/front/products.controller.js";
import { authCheck, customerCheck } from "../../lib/functions.js";

const router = new express.Router();

router.get("/", productsController.products);
router.get("/:id", productsController.productsById);
router.post(
  "/:id/review",
  authCheck,
  customerCheck,
  productsController.productReview
);

export default router;
