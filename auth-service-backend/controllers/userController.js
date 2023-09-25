import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateJwtToken from "../utils/generateJwtToken.js";
import generateToken from "../utils/generateJwtToken.js";

const registerUser = asyncHandler(async (req, res) => {
    console.log("userController.js > registerUser() req.body : ", req.body);
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
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                firstName: firstName,
                lastName: lastName,
                email: email
            });
            console.log("userController.js > registerUser() : User Registered Successfully");
        }
    }
});

const loginUser = async(req, res) => {
    console.log("userController,js > loginUser() req.body : ", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if(user && user.matchPasswords(password)){
        generateJwtToken(res, user._id);
        res.status(200).json({
            _id:user._id,
            firstname: firstName,
            lastName: lastName,
            email: email
        });
        console.log("userController,js > loginUser() : User Logged In Successfully");
    }
    else{
        console.log("userController,js > loginUser() : User Logged In Failed");
        res.status(401);
        throw new Error("Invalid Email or Password!");
    }
}

export {
    registerUser,
    loginUser
}