import express from "express";
import OrdersController from "../../controllers/cms/orders.controller.js";
const router = express.Router();

router.get("/", OrdersController.read);
router
  .route("/:id")
  .get(OrdersController.readByID)
  .delete(OrdersController.deleteById);

export default router;
