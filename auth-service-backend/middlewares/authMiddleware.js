import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            console.log("authMiddleware.js > protect() > req.user :", req.user);
            next();
        }
        catch (error) {
            console.log("authMiddleware.js > protect() > token :", token);
            res.status(401);
            throw new Error("Not Authorized! Invalid token.");
        }
    }
    else {
        console.log("authMiddleware.js > protect() > token :", token);
        res.status(401);
        throw new Error("Not Authorized! Token is not available.");
    }
});


export { protect }