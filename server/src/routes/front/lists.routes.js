import express from "express";
import listsController from "../../controllers/front/lists.controller.js";
import productsController from "../../controllers/front/products.controller.js";
const router = express.Router();

router.get("/categories", listsController.categories);
router.get("/categories/:id", listsController.categories);
router.get("/categories/:id/products", productsController.productsByCategoryID);

router.get("/brands", listsController.brands);
router.get("/brands/:id", listsController.brands);
router.get("/brands/:id/products", productsController.productsByBrandID);
router.get("/search", productsController.productSearch);

export default router;
