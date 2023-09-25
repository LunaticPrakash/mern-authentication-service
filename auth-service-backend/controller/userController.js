import User from "../models/userModel.js";

const registerUser = async (req, res) => {
    console.log("userController > registerUser : ", req.body);
    const { firstName, lastName, email, password } = req.body;
    const doesUserAlreadyExists = await User.findOne({ email: email });

    if (doesUserAlreadyExists) {
        res.status(400);
        throw new Error("Email already exists!");
    }
    else {
        const user = await User.create({
            firstName, lastName, email, password
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                firstName: firstName,
                lastName: lastName,
                email: email
            });
        }
    }

}