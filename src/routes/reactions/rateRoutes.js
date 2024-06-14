const { Router } = require("express");
const ratetRoutes = Router();
const rateController = require("../../controller/reactionsController/rate");
const authorization = require("../../middleware's/authorization");
const {
  updateRateValidation,
  addRateValidation,

} = require("../../middleware's/validation/rateValidation");
const { validate } = require("../../middleware's/validation")

ratetRoutes
  .route(addRateValidation(), validate, "/add-rate")
  .post(authorization, rateController.addRate);
ratetRoutes.route("/rates").get(rateController.getAllrates);
ratetRoutes
  .route("/rate/:id")
  .patch(authorization, updateRateValidation(), validate, rateController.updateRate)
  .delete(authorization, rateController.deleteRate);
ratetRoutes.route("/rates/:course_id").get(rateController.getCourseRates);

module.exports = ratetRoutes;
