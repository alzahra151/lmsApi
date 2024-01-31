const { Router } = require("express");
const ratetRoutes = Router();
const rateController = require("../../controller/reactionsController/rate")
const authorization = require("../../middleware's/authorization")
const { updateRateValidation, addRateValidation, validate } = require("../../middleware's/validation/rateValidation")

ratetRoutes.route(addRateValidation(), validate, "/add-rate")
    .post(authorization, rateController.addRate)
ratetRoutes.route("/rates")
    .get(rateController.getAllrates)
ratetRoutes.route("/rate/:id")
    .patch(authorization, updateRateValidation(), validate, rateController.updateRate)
    .delete(authorization, rateController.deleteRate)
ratetRoutes.route("/rates/:course_id")
    .get(rateController.getCourseRates)

module.exports = ratetRoutes;
