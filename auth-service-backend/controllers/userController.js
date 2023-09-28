import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateJwtToken from "../utils/generateJwtToken.js";

const registerUser = asyncHandler(async (req, res) => {
    console.log("userController.js > registerUser() > req.body : ", req.body);
    const { firstName, lastName, email, password } = req.body;
    const doesUserAlreadyExists = await User.findOne({ email: email });

    if (doesUserAlreadyExists) {
        console.log("userController.js > registerUser() : User Already Exists");
        res.status(400);
        throw new Error("Email already exists!");
    }
    else {
        const user = await User.create({
            firstName, lastName, email, password
        });
        if (user) {
            generateJwtToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                firstName: firstName,
                lastName: lastName,
                email: email
            });
            console.log("userController.js > registerUser() : User Registered Successfully");
        }
        else{
            res.status(400);
            throw new Error("Invalid user Data!");
        }
    }
});

const loginUser = asyncHandler(async(req, res) => {
    console.log("userController.js > loginUser() > req.body : ", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if(user && (await user.matchPasswords(password))){
        generateJwtToken(res, user._id);
        res.status(200).json({
            _id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
        console.log("userController.js > loginUser() : User Logged In Successfully");
    }
    else{
        console.log("userController,js > loginUser() : User Logged In Failed");
        res.status(401);
        throw new Error("Invalid Email or Password!");
    }
});

const getUserProfile = asyncHandler(async(req, res) => {
    console.log("userController.js > getUserProfile() > req.cookies : ", req.cookies);
    res.json(200);

});

const updateUserProfile = asyncHandler(async(req, res) => {
    console.log("userController.js > updateUserProfile() > req.cookies : ", req.cookies);
    res.json(200);

});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: "User logged out successfully!"});
});

export {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    logoutUser
}