import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { promises as fsp } from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logEvents = async (message, logFilename) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsp.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsp.appendFile(path.join(__dirname, '..', 'logs', logFilename), logItem);
    }
    catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

export { logEvents, logger }