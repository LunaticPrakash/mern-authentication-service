import Role from "../models/rolesModel.js";
import asyncHandler from "express-async-handler";

export const verifyRole = (...allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user.roles || req.user.roles.length == 0) {
            console.log("verifyRoleMiddleware.js > verifyRole() : User is not assinged with any roles.");
            res.status(403);
            throw new Error("You are not authorized");
        }
        const userRoles = await Promise.all(req.user.roles.map(async (roleId) => {
            const r = await Role.findById(roleId);
            return r['roleName']
        }));
        const allowedRolesArray = [...allowedRoles];
        console.log("allowedRolesArray : ", allowedRolesArray);
        console.log("userRoles : ", userRoles);
        const isAuthorized = userRoles.map(r => allowedRolesArray.includes(r)).find(val => val === true)
        if (!isAuthorized) {
            console.log("verifyRoleMiddleware.js > verifyRole() : User doesn't have required privilege to access this page.");
            res.status(403);
            throw new Error("You are not authorized");
        }
        next();
    })
}