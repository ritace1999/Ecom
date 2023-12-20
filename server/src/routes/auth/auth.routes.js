import express from "express";
import AuthController from "../../controllers/auth.controller.js";
const router = express.Router();
import { upload } from "../../lib/functions.js";

router.post("/login", AuthController.login);

router.post("/register", upload.single("profile"), AuthController.register);

export default router;
