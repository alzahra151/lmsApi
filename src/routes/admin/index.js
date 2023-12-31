const { Router } = require("express");
const adminRoutes = Router();
const adminController = require("../../controller/adminController/adminController");
const { addUser } = require("../../controller/user")
adminRoutes.route("/courses", adminController.getAllcourses);

adminRoutes.route("/users", adminController.getAllusers);
// adminRoutes.route("/addUser", userControler.addUser(req.body));

adminRoutes.post("/add", async (req, res, next) => {
    const userData = req.body
    try {
        const user = await addUser(userData)
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = adminRoutes;
