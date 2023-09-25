import express from "express";

const router = express.Router();
router.post("/register", ()=>{});
router.post("/login", ()=>{});
router.get("/:userId", ()=>{});
router.put("/:userId", ()=>{});
router.get("/logout", ()=>{});

export default router;