export const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user.roles || req.user.roles.length == 0) {
            console.log("verifyRoleMiddleware.js > verifyRole() : User is not assinged with any roles.");
            res.status(403);
            throw new Error("You are not authorized");
        }
        const allowedRolesArray = [...allowedRoles];
        const isAuthorized = req.user.roles.map(r => allowedRolesArray.includes(r)).find(val => val === true)
        if(!isAuthorized){
            console.log("verifyRoleMiddleware.js > verifyRole() : User doesn't have required privilege to access this page.");
            res.status(403);
            throw new Error("You are not authorized");
        }
        next();
    }
}