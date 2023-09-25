import express from "express";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", () => { });
router.get("/:userId", () => { });
router.put("/:userId", () => { });
router.get("/logout", () => { });

export default router;