import jwt from "jsonwebtoken";

const generateJwtToken = (res, email, roles) => {
    console.log("generateJwtToken.js > generateJwtToken() : Generating token with : ", {email, roles});
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
}

export default generateJwtToken;