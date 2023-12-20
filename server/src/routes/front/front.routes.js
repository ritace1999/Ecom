import express from "express";
import productRoutes from "./products.routes.js";
import listsRoutes from "./lists.routes.js";
import ordersController from "../../controllers/front/orders.controller.js";
import { authCheck, customerCheck } from "../../lib/functions.js";

const router = new express.Router();

router.use("/products", productRoutes);
router.use(listsRoutes);
router.post("/checkout", authCheck, customerCheck, ordersController.checkout);

export default router;
