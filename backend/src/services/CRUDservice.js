import db from "../models/index";
import bcryptjs from "bcryptjs";

var salt = bcryptjs.genSaltSync(10);

let createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordbcryptjs = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordbcryptjs,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        roleId: data.roleId,
      });
      resolve("ok lun nhé tạo rồi");
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcryptjs.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({ raw: true });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.Id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        await user.save();
        resolve();
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUserData = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy({
          where: { id: userId },
        });
        resolve({
          errCode: 0,
          message: "the user was deleted successfully",
        });
      }
      resolve({
        errCode: 2,
        message: "the user isn't exits",
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createUser: createUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserData: deleteUserData,
};
