import express from "express";
import homControllers from "../controller/homController";

let router = express.Router();

let initWebRouter = (app) => {
  router.get("/", homControllers.getHomePage);
  return app.use("/", router);
};

module.exports = initWebRouter;
