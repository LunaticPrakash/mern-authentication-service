import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    }
    catch(error){
        console.error(`Error while connecting to MongoDB : ${error.message} \nExiting Now.`);
        process.exit(1);
    }
}

export default connectDB;