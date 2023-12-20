import express from "express";
import ProfileController from "../../controllers/profile.controller.js";
import { customerCheck } from "../../lib/functions.js";
const router = express.Router();

router.get("/user", ProfileController.user);

router
  .route("/edit")
  .put(ProfileController.update)
  .patch(ProfileController.update);

router
  .route("/password")
  .put(ProfileController.password)
  .patch(ProfileController.password);
router.get("/orders", customerCheck, ProfileController.orders);
router.get("/reviews", customerCheck, ProfileController.reviews);

export default router;
