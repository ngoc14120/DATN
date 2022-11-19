import db from "../models/index";
require("dotenv").config();
import _ from "lodash";

let CreateBookingPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.timeType) {
        resolve({
          errCode: 1,
          message: "missing parameter",
        });
      } else {
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            firstName: data.fullName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            gender: data.gender,
          },
        });
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          });
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

module.exports = {
  CreateBookingPatient,
};
