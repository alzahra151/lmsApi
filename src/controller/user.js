

const db = require("../models")
const ApiError = require("../helpers/apiError")
const ApiResponser = require("../helpers/apiResponser")
const { compareSync } = require("bcrypt")
const jwt = require("jsonwebtoken")
const { getPagination, getPagingData } = require("../controller/pagination/pagination")

async function addUser(req, res, next) {
    console.log(req.body)
    let {
        first_name,
        last_name,
        password,
        email,
        user_type,
        mobile,
        class_id,
        photo,
        role_id,
        brief,
        subject
    } = req.body
    try {
        if (req.file) photo = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
        if (!user_type) throw new ApiError("نوع المستخدم غير موجود")
        const role = await db.Role.findAll({
            limit: 1,
            where: { name: user_type }
        });
        console.log(role)
        if (!role[0]) throw new ApiError("صلاحية المستخدم غير موجودة ")
        role_id = role[0].id;
        const user = await db.User.create({
            first_name,
            last_name,
            password,
            email,
            user_type,
            mobile,
            class_id,
            role_id,
            photo,
            brief,
            subject
        })
        return new ApiResponser(res, { user })
    } catch (err) {
        next(err)
    }
}
async function getAllusers(req, res, next) {
    try {
        const { page, pageSize } = req.query;
        const { limit, offset } = getPagination(page, pageSize);
        const users = await db.User.findAndCountAll(
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
                limit,
                offset,
            },
        );

        return new ApiResponser(res, getPagingData(users, page, limit, users));
    } catch (error) {
        next(error);
    }
}
async function login(req, res, next) {
    const { mobile, password } = req.body

    console.log(req.body)
    try {
        const user = await db.User.findOne({ where: { mobile: mobile } })
        if (!user) {
            throw new ApiError({ 'mobile': req.t("notFoundUser") }, 401)
        } else {
            console.log(user)
            const verfiypassword = await compareSync(password, user.password)
            console.log(verfiypassword)
            if (!verfiypassword) {
                throw new ApiError({ 'password': req.t("wrongPassword") }, 401)
            } else {
                const token = jwt.sign({ id: user.id, role_id: user.role_id, user_type: user.user_type }
                    , `${process.env.SECRET_KEY}`,
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
        if (!user) throw new ApiError(req.t("notFoundUser"), 404)
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
        if (updatedRowscount == 0) throw new ApiError(req.t("notFoundUser"), 404)
        return new ApiResponser(res, { updatedRowscount })

    } catch (error) {
        next(error)
    }
}
async function getTeachers(req, res, next) {
    try {

        const teachers = await db.User.findAll(
            {
                where: {
                    user_type: "teacher"
                },
                include: [

                    {
                        model: db.Role,
                        as: "role",
                    },
                ],
                attributes: {
                    exclude: ["password"],
                },

            },
        );

        return new ApiResponser(res, { teachers })
    } catch (error) {
        next(error);
    }
}
module.exports = {
    addUser,
    login,
    getUserById,
    updateUser,
    getAllusers,
    getTeachers
}

