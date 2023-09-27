import express from "express";
import { updateUserProfile, getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/").get(getUserProfile).put(updateUserProfile);
router.get("/logout", logoutUser);

export default router;