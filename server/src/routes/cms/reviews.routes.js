import express from "express";
import ReviewsController from "../../controllers/cms/reviews.controller.js";
const router = express.Router();

router.get("/", ReviewsController.read);
router
  .route("/:id")
  .get(ReviewsController.readByID)
  .delete(ReviewsController.deleteById);

export default router;
