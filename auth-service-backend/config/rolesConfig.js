import Role from "../models/rolesModel.js";

export const ROLES_LIST = [
    {
        roleName: "USER",
        roleDescription: "Default roles assigned to user"
    },
    {
        roleName: "ADMIN",
        roleDescription: "User having all privileges."
    },
]

export const rolesInitializer = async () => {
    const rolesFromDB = await Role.find();
    ROLES_LIST.map(async (r) => {
        const doesRoleExistInDB = rolesFromDB.find((rdb) => rdb.roleName === r.roleName)
        if (!doesRoleExistInDB) {
            await Role.create(r);
        }
        else {
            console.log(`ROLE ${r.roleName} exists in DB.`);
            const isRoleDescUpdated = rolesFromDB.find((rdb) => (rdb.roleName === r.roleName) && (rdb.roleDescription !== r.roleDescription))
            
            if (isRoleDescUpdated) {
                await Role.updateOne({ roleName: r.roleName }, r);
            }
        }
    });
    rolesFromDB.map(async (rdb) => {
        const doesRoleExistInRolesConfig = ROLES_LIST.some((r) => r.roleName === rdb.roleName)
        if (!doesRoleExistInRolesConfig) {
            await Role.deleteOne(rdb);
        }
    });
}