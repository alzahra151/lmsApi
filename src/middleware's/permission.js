

const ApiError = require("../helpers/apiError");
const db = require("../models");

exports.checkPermission = (permission) => {
    return async (req, res, next) => {
        const userRoleId = req.user ? req.user.role_id : 'anonymous';
        console.log(req.user)
        const role = await db.Role.findByPk(userRoleId)
        console.log(role)
        if (!role) return res.status(403).json({ error: 'role not exit' });
        if (role.permissions.includes(permission)) {
            return next();
        } else {
            return res.status(403).json({ error: 'Access denied' });
        }
    };
};

