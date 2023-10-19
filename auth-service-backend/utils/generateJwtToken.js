import jwt from "jsonwebtoken";
import { logEvents } from "../middlewares/loggerMiddleware.js";

const generateJwtToken = async (res, email, roles) => {
    console.log("generateJwtToken.js > generateJwtToken() : Generating token with : ", { email, roles });
    const token = jwt.sign(
        {
            "UserInfo": {
                "useremail": email,
                "roles": roles
            }
        }
        , process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'DEVELOPMENT' ? false : true,
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000
    });
    console.log("generateJwtToken.js > generateJwtToken() : Token generated & set to cookies successfully");
    await logEvents(`LOGGED IN: EMAIl=${email}`, 'userLog.log')
}

export default generateJwtToken;