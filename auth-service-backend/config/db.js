import mongoose from "mongoose";
import { logEvents } from "../middlewares/loggerMiddleware.js";
import { rolesInitializer } from "./rolesConfig.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`);
        rolesInitializer();
        await logEvents(`CONNECTED : ${conn.connection.host} ${conn.connection.name}\t${conn.connection.port}`, 'mongoDBLog.log')
    }
    catch (error) {
        console.error(`Error while connecting to MongoDB : ${error.message} \nExiting Now.`);
        await logEvents(`ERROR : ${error.name}: ${error.message}\t${error.code}`, 'mongoDBLog.log')
        process.exit(1);
    }
}

export default connectDB;