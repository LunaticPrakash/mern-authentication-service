import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res) => {
    const token = req.cookies ? req.cookies.jwt : null;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
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