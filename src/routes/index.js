const { Router } = require("express");
const adminRoutes = require("./admin");
const routes = Router();
const studentRoutes = require("./student/studentRoutes")
// const userRoutes = require("../routes/user")

routes.use("/admin", adminRoutes);
routes.use("/", studentRoutes)
// routes.use("/user", userRoutes)

module.exports = routes;
