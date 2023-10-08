import express from "express";
import { ROLES_LIST } from "../config/rolesList.js";
import { updateUserProfile, getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { verifyRole } from "../middlewares/verifyRoleMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/").get(protect, getUserProfile).put(protect, updateUserProfile);
router.get("/logout", logoutUser);

router.get("/admin", protect, verifyRole(ROLES_LIST.ADMIN), (req, res) => {
    res.status(200).send("Welcome to Admin Page. Only Admin can access this page");
});
router.get("/user", protect, verifyRole(ROLES_LIST.USER), (req, res) => {
    res.status(200).send("Welcome to User Page. Only User can access this page");
});
router.get("/both", protect, verifyRole(ROLES_LIST.USER, ROLES_LIST.ADMIN), (req, res) => {
    res.status(200).send("Welcome to Both Page. Both User & Admin can access this page");
});
router.get("/public", (req, res) => {
    res.status(200).send("Welcome to Public Page. Any user even without authentication can access this page");
});

export default router;