import express from "express";
import homControllers from "../controller/homController";
import userControllers from "../controller/userController";

let router = express.Router();

let initWebRouter = (app) => {
  router.get("/", homControllers.getHomePage);
  router.get("/crud", homControllers.getCRUD);

  router.post("/post-crud", homControllers.postCRUD);
  router.get("/get-crud", homControllers.displayGETCRUD);
  router.get("/edit-crud", homControllers.getEditCRUD);
  router.post("/put-crud", homControllers.getPutCRUD);
  router.get("/delete-crud", homControllers.deleteCRUD);

  router.post("/api/login", userControllers.handleLogin);
  router.get("/api/get-all-users", userControllers.handleGetAllUsers);
  router.post("/api/create-new-user", userControllers.handleCreateNewUser);
  router.put("/api/edit-user", userControllers.handleEditUser);
  router.delete("/api/delete-user", userControllers.handleDeleteUser);

  return app.use("/", router);
};

module.exports = initWebRouter;
