import express from "express";
import homControllers from "../controller/homController";

let router = express.Router();

let initWebRouter = (app) => {
  router.get("/", homControllers.getHomePage);
  router.get("/crud", homControllers.getCRUD);

  router.post("/post-crud", homControllers.postCRUD);
  router.get("/get-crud", homControllers.displayGETCRUD);
  router.get("/edit-crud", homControllers.getEditCRUD);
  router.post("/put-crud", homControllers.getPutCRUD);
  router.get("/delete-crud", homControllers.deleteCRUD);

  return app.use("/", router);
};

module.exports = initWebRouter;
