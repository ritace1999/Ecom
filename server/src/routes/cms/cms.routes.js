import express from "express";
import staffsRoutes from "./staff.routes.js";
import customersRoutes from "./customers.routes.js";
import categoriesRoutes from "./categories.routes.js";
import brandsRoutes from "./brands.routes.js";
import productsRoutes from "./products.routes.js";
import reviewsRoutes from "./reviews.routes.js";
import ordersRoutes from "./orders.routes.js";
import { adminCheck } from "../../lib/functions.js";
const router = express.Router();

router.use("/staffs", adminCheck, staffsRoutes);
router.use("/customers", customersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/brands", brandsRoutes);
router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);
router.use("/reviews", reviewsRoutes);

export default router;
