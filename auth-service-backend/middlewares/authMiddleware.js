import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res) => {
    const token = req.cookies.jwt;
    console.log("token : ", token);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            console.log("decoded : ", decoded);
            console.log("user : ", req.user);
            return next();
        }
        catch (error) {
            res.status(401);
            throw new Error("Not Authorized! Invalid token.");
        }
    }
    else {
        res.status(401);
        throw new Error("Not Authorized! Token is not available.");
    }
});


export { protect }