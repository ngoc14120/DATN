import db from "../models/index";

let getDentistNew = (limitInput) => {
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
      if (!data.contentHTML || !data.contentMarkdown || !data.doctorId) {
        resolve({
          errCode: 1,
          message: "missing parameter ",
        });
      } else {
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
          attributes: { exclude: ["password", "image"] },
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
          raw: true,
          nest: true,
        });
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
};
