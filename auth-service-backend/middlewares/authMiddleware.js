import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findOne({ email: decoded.UserInfo.useremail }).select('-password');
            if (!req.user)
                throw new Error("User doesn't exist in Database!");
            console.log("authMiddleware.js > protect() > User is authenticated.");
            next();
        }
        catch (error) {
            console.log("authMiddleware.js > protect() > token :", token);
            res.status(401);
            throw new Error("Not Authenticated! Invalid token.");
        }
    }
    else {
        console.log("authMiddleware.js > protect() > token :", token);
        res.status(401);
        throw new Error("Not Authenticated! Token is not available.");
    }
});


export { protect }