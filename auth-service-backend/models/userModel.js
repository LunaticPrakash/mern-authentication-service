import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        set: (value) => value.toLowerCase()
    },
    password: {
        type: String,
        min:8,
        required: true,
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;