import express from "express";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", );
router.post("/login", ()=>registerUser);
router.get("/:userId", ()=>{});
router.put("/:userId", ()=>{});
router.get("/logout", ()=>{});

export default router;