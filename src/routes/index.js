const { Router } = require("express");
const adminRoutes = require("./admin");
const routes = Router();
const studentRoutes=require("./student/studentRoutes")

routes.use("/admin", adminRoutes);
routes.use("/",studentRoutes )
module.exports = routes;
