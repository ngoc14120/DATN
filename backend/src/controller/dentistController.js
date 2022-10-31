import db from "../models/index";
import dentistService from "../services/dentistService";

let handleGetDentistNew = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await dentistService.getDentistNew(+limit);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};

module.exports = {
  handleGetDentistNew: handleGetDentistNew,
};
