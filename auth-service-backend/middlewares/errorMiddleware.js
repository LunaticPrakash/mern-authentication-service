import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { logEvents } from "./loggerMiddleware.js";

const notFoundErrorMiddleware = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
    // if(req.accepts('html')){
    //     res.sendFile(path.join(__dirname, '..', 'public', 'html', '404.html'))
    // }
    // else if(req.accepts('json')){
    //     next(error);
    // }
    // else{
    //     res.type('txt').send('404 Not Found');
    // }
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = "Resource Not Found!";
    }
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === "PRODUCTION" ? null : err.stack
    });
}

export {
    notFoundErrorMiddleware,
    errorHandler
};