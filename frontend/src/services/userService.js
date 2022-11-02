import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};
const editUserService = (userId) => {
  return axios.put("/api/edit-user", userId);
};
const getAllCodeService = (inputtype) => {
  return axios.get(`/api/allcode?type=${inputtype}`);
};

const getDentistNewService = (limit) => {
  return axios.get(`/api/get-dentist-new?limit=${limit}`);
};
const getDentistAllService = () => {
  return axios.get(`/api/get-dentist-all`);
};
const createDentistInfoService = (data) => {
  return axios.post("/api/create-dentist-info", data);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getDentistNewService,
  getDentistAllService,
  createDentistInfoService,
};
