import asyncHandler from "express-async-handler";
import { ROLES_LIST } from "../config/rolesConfig.js";
import User from "../models/userModel.js";
import Role from "../models/rolesModel.js"
import generateJwtToken from "../utils/generateJwtToken.js";

const registerUser = asyncHandler(async (req, res) => {
    console.log("userController.js > registerUser() > req.body : ", req.body);
    const { firstName, lastName, email, mobileNumber, password } = req.body;
    const doesUserAlreadyExists = await User.findOne({ email: email });

    if (doesUserAlreadyExists) {
        console.log("userController.js > registerUser() : User Already Exists");
        res.status(409);
        throw new Error("Email already exists!");
    }
    else {
        const userRole = await Role.findOne({ roleName: "USER" })
        const user = await User.create({
            firstName, lastName, email, password, mobileNumber, roles: userRole
        });
        if (user) {
            generateJwtToken(res, user.email, user.roles);
            res.status(201).json({
                _id: user._id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNumber: mobileNumber,
                roles: user.roles
            });
            console.log("userController.js > registerUser() : User Registered Successfully! user : ", user);
        }
        else {
            res.status(400);
            throw new Error("Invalid user Data!");
        }
    }
});

const loginUser = asyncHandler(async (req, res) => {
    console.log("userController.js > loginUser() > req.body : ", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPasswords(password))) {
        generateJwtToken(res, email, user.roles);
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobileNumber: user.mobileNumber,
            roles: user.roles
        });
        console.log("userController.js > loginUser() : User Logged In Successfully! user : ", user);
    }
    else {
        console.log("userController,js > loginUser() : User Logged In Failed");
        res.status(401);
        throw new Error("Invalid Email or Password!");
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    console.log("userController.js > getUserProfile() > req.user : ", req.user);
    res.json(req.user);

});

const updateUserProfile = asyncHandler(async (req, res) => {
    console.log("userController.js > updateUserProfile() > req.body : ", req.body);
    const user = await User.findById(req.user._id);
    if (user) {
        user.firstName = req.body.firstName || user.firstName,
            user.lastName = req.body.lastName || user.lastName,
            user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updatedUser = await user.save();
        console.log("userController.js > updateUserProfile() > User updated successfully!\nupdatedUser : ", updatedUser);
        if (req.body.email) {
            generateJwtToken(res, req.body.email, user.roles);
        }
        res.status(200).json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email
        })
    }
    else {
        console.log("userController.js > updateUserProfile() > req.body : ", req.body);
        res.status(404);
        throw new Error("User not found!");
    }

});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out successfully!" });
});

export {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    logoutUser
}