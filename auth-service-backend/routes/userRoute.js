import express from "express";
import { getUserByEmailId, loginUser, logoutUser, registerUser } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUserByEmailId);
router.get("/logout", logoutUser);

export default router;