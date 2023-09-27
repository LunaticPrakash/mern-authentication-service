import express from "express";
import { getUser, loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", getUser);
router.put("/:userId", () => { });
router.get("/logout", () => { });

export default router;