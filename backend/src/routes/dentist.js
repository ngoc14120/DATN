import express from "express";
import homControllers from "../controller/homController";
import userControllers from "../controller/userController";
import dentistController from "../controller/dentistController";

let router = express.Router();

let dentistRouter = (app) => {
  router.post(
    "/api/create-schedule-dentist",
    dentistController.handleCreateScheduleDentist
  );
  router.get(
    "/api/get-schedule-dentist-by-date",
    dentistController.handleGetScheduleDentistByDate
  );

  return app.use("/", router);
};

module.exports = dentistRouter;