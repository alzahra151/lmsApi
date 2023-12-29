const { Router } = require("express");
const adminRoutes = require("./admin");
const routes = Router();

routes.use("/admin", adminRoutes);

module.exports = routes;
