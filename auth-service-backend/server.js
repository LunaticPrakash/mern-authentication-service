import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js"
import { notFoundErrorMiddleware, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";


dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/user", userRoute);

app.use(notFoundErrorMiddleware);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}.`);
});