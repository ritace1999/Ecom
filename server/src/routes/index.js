import express from "express";
const router = express.Router();
import authRoutes from "./auth/auth.routes.js";
import profileRoutes from "./profile/profile.routes.js";
import frontRoutes from "./front/front.routes.js";
import { authCheck, cmsCheck } from "../lib/functions.js";
import cmsRoutes from "./cms/cms.routes.js";

router.use(authRoutes);
router.use("/profile", authCheck, profileRoutes);
router.use("/cms", authCheck, cmsCheck, cmsRoutes);
router.use(frontRoutes);
router.use((req, res, next) => {
  next({
    status: 404,
    msg: `Invalid method/URL ${req.method} ${req.path}`,
  });
});

export default router;
