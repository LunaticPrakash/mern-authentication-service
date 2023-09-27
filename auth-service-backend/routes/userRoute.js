import express from "express";
import { getUserByEmailId, loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUserByEmailId);
router.put("/:userId", () => { });
router.get("/logout", () => { });

export default router;