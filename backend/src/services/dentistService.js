import db from "../models/index";
require("dotenv").config();
import _ from "lodash";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getDentistNew = (limitInput) => {
  console.log(limitInput);
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["password"] },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({ errCode: 0, data: users });
    } catch (e) {
      reject(e);
    }
  });
};

let getDentistAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: { exclude: ["password", "image"] },
      });

      resolve({ errCode: 0, data: users });
    } catch (e) {
      reject(e);
    }
  });
};

let createNewInfoDentist = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.contentHTML ||
        !data.contentMarkdown ||
        !data.doctorId ||
        !data.action
      ) {
        resolve({
          errCode: 1,
          message: "missing parameter ",
        });
      } else {
        if (data.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
            description: data.description,
            doctorId: data.doctorId,
          });
          resolve({
            errCode: 0,
            message: "ok",
          });
        } else if (data.action === "EDIT") {
          let dentistMarkdown = await db.Markdown.findOne({
            where: { doctorId: data.doctorId },
            raw: false,
          });
          console.log(dentistMarkdown);
          if (dentistMarkdown) {
            dentistMarkdown.contentHTML = data.contentHTML;
            dentistMarkdown.contentMarkdown = data.contentMarkdown;
            dentistMarkdown.description = data.description;

            await dentistMarkdown.save();
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
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailDentistById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "missing parameter ",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: id },
          attributes: { exclude: ["password"] },
          include: [
            {
              model: db.Markdown,
              attributes: ["contentHTML", "contentMarkdown", "description"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let CreateScheduleDentist = (data) => {
  console.log("data", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.arrSchedule || !data.formateDate) {
        resolve({
          errCode: 1,
          message: "missing parameter ",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        let existing = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: data.formateDate },
          attributes: ["timeType", "maxNumber", "date", "doctorId"],
        });

        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
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

let GetScheduleDentistByDate = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          message: "missing parameter ",
        });
      } else {
        let data = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: date },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getDentistNew,
  getDentistAll,
  createNewInfoDentist,
  getDetailDentistById,
  CreateScheduleDentist,
  GetScheduleDentistByDate,
};
