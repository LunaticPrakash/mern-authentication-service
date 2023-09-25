import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js"

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use("/api/user", userRoute);

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}.`);
});