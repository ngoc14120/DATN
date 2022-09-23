import db from "../models/index";
import CURDservice from "../services/CRUDservice";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let displayGETCRUD = async (req, res) => {
  let data = await CURDservice.getAllUser();
  return res.render("displayCRUD.ejs", { dataTable: data });
};
let postCRUD = async (req, res) => {
  let mesage = await CURDservice.createUser(req.body);
  return res.redirect("/get-crud");
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CURDservice.getUserInfoById(userId);
    return res.render("editCRUD.ejs", { userDataEdit: userData });
  } else {
    return res.send("ok ddos");
  }
};
let getPutCRUD = async (req, res) => {
  let data = req.body;
  await CURDservice.updateUserData(data);
  return res.redirect("/get-crud");
};
let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  await CURDservice.deleteUserData(id);

  return res.redirect("/get-crud");
};
module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGETCRUD: displayGETCRUD,
  getEditCRUD: getEditCRUD,
  getPutCRUD: getPutCRUD,
  deleteCRUD: deleteCRUD,
};
