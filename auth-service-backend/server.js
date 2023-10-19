import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import root from "./routes/root.js";
import userRoute from "./routes/userRoute.js"
import { notFoundErrorMiddleware, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { logger } from "./middlewares/loggerMiddleware.js";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const app = express();

app.use(logger);
app.use(cors(corsOptions))
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/", root)

app.use(notFoundErrorMiddleware);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});