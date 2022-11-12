import db from "../models/index";
import bcryptjs from "bcryptjs";

var salt = bcryptjs.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password", "firstName"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcryptjs.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "user's not found~";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage =
          "Your's email isn't exist in your system. Please try other email";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
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
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "All") {
        users = await db.User.findAll({
          attributes: { exclude: ["password"] },
        });
      }
      if (userId !== "All") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: { exclude: ["password"] },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          message: "Your email is already in used, plz try another email",
        });
      } else {
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
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          message: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// thêm mới dịch vụ
let createNewService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.priceId) {
        resolve({
          errCode: 1,
          message: "missing parameter ",
        });
      } else {
        if (data.action === "CREATE") {
          await db.Service.create({
            name: data.name,
            description: data.description,
            priceId: data.priceId,
            image: data.avatar,
          });
        } else if (data.action === "EDIT") {
          let service = await db.Service.findOne({
            where: { id: data.id },
            raw: false,
          });
          if (service) {
            service.name = data.name;
            service.priceId = data.priceId;
            service.description = data.description;
            if (service.avatar) {
              service.image = data.avatar;
            }

            await service.save();
          }
        }
      }

      resolve({
        errCode: 0,
        message: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getServiceAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.Service.findAll();

      resolve({ errCode: 0, data: users });
    } catch (e) {
      reject(e);
    }
  });
};
let getServiceAllLimit = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.Service.findAll({
        limit: limitInput,
        order: [["createdAt", "DESC"]],
      });

      resolve({ errCode: 0, data: users });
    } catch (e) {
      reject(e);
    }
  });
};

//22222222222222
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await db.User.destroy({
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

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.gender || !data.positionId) {
        resolve({
          errCode: 2,
          message: "missing required parameters ",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.gender = data.gender;
        if (data.avatar) {
          user.image = data.avatar;
        }
        await user.save();
        resolve({
          errCode: 0,
          message: "update successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "user not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!type) {
        resolve({
          errCode: 1,
          message: " missing required  parameters",
        });
      } else {
        let res = {};

        let allCode = await db.Allcode.findAll({
          where: { type: type },
        });
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  editUser: editUser,
  getAllCodeService: getAllCodeService,
  createNewService,
  getServiceAll,
  getServiceAllLimit,
};
