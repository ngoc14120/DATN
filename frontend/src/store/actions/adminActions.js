import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getDentistNewService,
  getDentistAllService,
  createDentistInfoService,
  getDetailDentistInfoService,
  createScheduleDentistService,
  getScheduleDentistByDateService,
  getExtraInfoDentistByIdService,
  handleUserRegister,
  bookingPatientService,
  verifyBookingPatientService,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const userRegister = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleUserRegister(data);
      if (res && res.errCode === 0) {
        toast.success("T???o t??i kho???n th??nh c??ng");
        dispatch({
          type: actionTypes.USER_REGISTER_SUCCESS,
        });
      } else {
        toast.error("T???o t??i kho???n kh??ng th??nh c??ng");
        dispatch({
          type: actionTypes.USER_REGISTER_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.USER_REGISTER_FAILED,
      });
    }
  };
};
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("T???o t??i kho???n th??nh c??ng");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("T???o t??i kho???n kh??ng th??nh c??ng");
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("L???y t???t c??? ng?????i d??ng kh??ng th??nh c??ng");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      dispatch(fetchAllUsersFailed());
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("X??a ng?????i d??ng th??nh c??ng");
        dispatch(deleteUsersSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("X??a ng?????i d??ng th???t b???i");
        dispatch(deleteUsersFailed());
      }
    } catch (e) {
      dispatch(deleteUsersFailed());
    }
  };
};
export const deleteUsersSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUsersFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("C???p nh???t ng?????i d??ng th??nh c??ng");
        dispatch(editUsersSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("C???p nh???t ng?????i d??ng th???t b???i");
        dispatch(editUsersFailed());
      }
    } catch (e) {
      dispatch(editUsersFailed());
    }
  };
};
export const editUsersSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUsersFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchDentistNew = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getDentistNewService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DENTIST_NEW_SUCCESS,
          dataDentist: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DENTIST_NEW_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_DENTIST_NEW_FAILED,
      });
    }
  };
};
export const fetchDentistAll = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getDentistAllService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DENTIST_ALL_SUCCESS,
          dataDentistAll: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DENTIST_ALL_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_DENTIST_ALL_FAILED,
      });
    }
  };
};

export const createDentistInfo = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createDentistInfoService(data);
      if (res && res.errCode === 0) {
        toast.success("T???o th??ng tin nha s?? th??nh c??ng");
        dispatch({
          type: actionTypes.CREATE_DENTIST_INFO_SUCCESS,
        });
      } else {
        toast.error("T???o th??ng tin nha s?? th???t b???i");
        dispatch({
          type: actionTypes.CREATE_DENTIST_INFO_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.CREATE_DENTIST_INFO_FAILED,
      });
    }
  };
};

export const fetchDetailDentistInfo = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDetailDentistInfoService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DETAIL_DENTIST_INFO_SUCCESS,
          dataDetailDentist: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DETAIL_DENTIST_INFO_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_DETAIL_DENTIST_INFO_FAILED,
      });
    }
  };
};

export const fetchScheduleTimeAll = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const createScheduleDentist = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createScheduleDentistService(data);
      if (res && res.errCode === 0) {
        toast.success("T???o th???i gian kh??m th??nh c??ng");
        dispatch({
          type: actionTypes.CREATE_SCHEDULE_DENTIST_SUCCESS,
        });
      } else {
        toast.error("T???o th???i gian kh??m th???t b???i");
        dispatch({
          type: actionTypes.CREATE_SCHEDULE_DENTIST_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.CREATE_SCHEDULE_DENTIST_FAILED,
      });
    }
  };
};

export const fetchScheduleDentistByDate = (doctorId, date) => {
  return async (dispatch, getState) => {
    try {
      let res = await getScheduleDentistByDateService(doctorId, date);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_SCHEDULE_DENTIST_BY_DATE_SUCCESS,
          dataScheduleDate: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_SCHEDULE_DENTIST_BY_DATE_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_SCHEDULE_DENTIST_BY_DATE_FAILED,
      });
    }
  };
};

export const fetchRequiredDentistInfoStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DENTIST_INFO_START });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
        };
        dispatch(fetchRequiredDentistInfoSuccess(data));
      } else {
        dispatch(fetchRequiredDentistInfoFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDentistInfoFailed());
    }
  };
};
export const fetchRequiredDentistInfoSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRED_DENTIST_INFO_SUCCESS,
  allRequiredData: data,
});
export const fetchRequiredDentistInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DENTIST_INFO_FAILED,
});

export const bookingPatient = (data) => {
  return async (dispatch, getState) => {
    try {
      console.log(data);
      let res = await bookingPatientService(data);
      if (res && res.errCode === 0) {
        toast.success("???? t???o th??ng tin ng?????i d??ng vui l??ng ki???m tra Email");
        dispatch({
          type: actionTypes.BOOKING_PATIENT_SUCCESS,
        });
      } else {
        toast.error("Th??ng tin b??? l???i vui l??ng ????ng k?? l???i");
        dispatch({
          type: actionTypes.BOOKING_PATIENT_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.BOOKING_PATIENT_FAILED,
      });
    }
  };
};
export const verifyBookingPatient = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await verifyBookingPatientService(data);
      if (res && res.errCode === 0) {
        toast.success("G???i h??a ????n th??nh c??ng");
        dispatch({
          type: actionTypes.VERIFY_BOOKING_PATIENT_SUCCESS,
          data: res.errCode,
        });
      } else {
        toast.error("G???i h??a ????n th???t b???i");
        dispatch({
          type: actionTypes.VERIFY_BOOKING_PATIENT_FAILED,
          data: res.errCode,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.VERIFY_BOOKING_PATIENT_FAILED,
      });
    }
  };
};
