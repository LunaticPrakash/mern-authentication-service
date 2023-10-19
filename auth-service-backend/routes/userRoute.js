import express from "express";
import { ROLES_LIST } from "../config/rolesConfig.js";
import { updateUserProfile, getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { verifyRole } from "../middlewares/verifyRoleMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/").get(protect, getUserProfile).put(protect, updateUserProfile);
router.get("/logout", logoutUser);

const userRole = ROLES_LIST.filter(r => r.roleName == "USER")[0].roleName;
const adminRole = ROLES_LIST.filter(r => r.roleName == "ADMIN")[0].roleName

router.get("/admin", protect, verifyRole(adminRole), (req, res) => {
    res.status(200).send("Welcome to Admin Page. Only Admin can access this page");
});
router.get("/user", protect, verifyRole(userRole), (req, res) => {
    res.status(200).send("Welcome to User Page. Only User can access this page");
});
router.get("/both", protect, verifyRole(userRole, adminRole), (req, res) => {
    res.status(200).send("Welcome to Both Page. Both User & Admin can access this page");
});
router.get("/public", (req, res) => {
    res.status(200).send("Welcome to Public Page. Any user even without authentication can access this page");
});

export default router;