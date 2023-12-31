const { Router } = require("express");
const userRoutes = Router();
const adminController = require("../../controller/adminController/adminController");
const { addUser } = require("../../controller/user")
userRoutes.post("/add-user", async (req, res, next) => {
    const userData = req.body
    try {
        const user = await addUser(userData)
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json(error)
    }
});

userRoutes.post('/login', async (req, res, next) => {

})
module.exports = userRoutes;
