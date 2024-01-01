
const db = require("../models")
const ApiError = require("../helpers/apiError")
const { compareSync } = require("bcrypt")
const ApiResponser = require("../helpers/apiResponser")
const jwt = require("jsonwebtoken")
const { validationResult } = require('express-validator')

async function addUser(req, res, next) {
    const userData = req.body
    const dataErrors = validationResult(req)
    try {
        if (!dataErrors.isEmpty()) throw new ApiError(dataErrors.array(), 401)
        if (req.file) userData.photo = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
        const user = await db.User.create(userData)
        return new ApiResponser(res, { user })
    } catch (err) {
        next(err)
    }
}
async function getAllusers(req, res, next) {
    try {
        const users = await db.User.findAll(
            {
                include: [
                    {
                        model: db.Class,
                        as: "class",
                    },
                    {
                        model: db.Role,
                        as: "role",
                    },
                ],
                attributes: {
                    exclude: ["password"],
                },
            },
            { raw: true }
        );
        return new ApiResponser(res, { users });
    } catch (error) {
        next(error);
    }
}
async function login(req, res, next) {
    const { mobile, password } = req.body

    console.log(req.language)
    const dataErrors = validationResult(req)
    try {
        if (!dataErrors.isEmpty()) throw new ApiError(dataErrors.array(), 401)
        const user = await db.User.findOne({ where: { mobile: mobile } })
        if (!user) {
            throw new ApiError("User not found", 401)
        } else {
            const verfiypassword = await compareSync(password, user.password)
            if (!verfiypassword) {
                throw new ApiError("Password not match", 401)
            } else {
                const token = jwt.sign({ id: user.id, role: user.role }
                    , process.env.SECRET_KEY,
                    {
                        expiresIn: "10d"
                    })
                return new ApiResponser(res, { token })
            }
        }
    } catch (err) {
        next(err)
    }

}
async function getUserById(req, res, next) {
    const userId = req.params.id
    try {
        const user = await db.User.findByPk(userId,
            {
                include: [
                    {
                        model: db.Class,
                        as: "class",
                    },
                    {
                        model: db.Role,
                        as: "role",
                    },
                ],
                attributes: {
                    exclude: ["password"],
                },
            },
        )
        if (!user) throw new ApiError("user not found", 404)
        return new ApiResponser(res, { user })
    } catch (error) {
        next(error)
    }
}

async function deleteUser() {

}
async function updateUser(req, res, next) {
    const userId = req.params.id
    const newUserData = req.body
    try {
        if (req.file) newUserData.photo = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`

        const [updatedRowscount, updatedRows] = await db.User.update(newUserData, { where: { id: userId } })
        if (updatedRowscount == 0) throw new ApiError("user not found", 404)
        return new ApiResponser(res, { updatedRowscount })

    } catch (error) {
        next(error)
    }
}
module.exports = {
    addUser,
    login,
    getUserById,
    updateUser,
    getAllusers
}