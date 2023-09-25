import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    else{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

const User = mongoose.model('User', userSchema);
export default User;