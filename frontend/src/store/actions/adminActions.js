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
  createServiceNewService,
  getServiceAllService,
  getServiceAllLimitService,
  deleteService,
  createServiceInfoService,
  getDetailServiceInfoService,
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

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      console.log(data);
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("create new user success");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("create new user error");
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
        toast.error("fetch aall user error");
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
        toast.success("delete user success");
        dispatch(deleteUsersSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("delete user error");
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
        toast.success("edit user success");
        dispatch(editUsersSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("edit user error");
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
        toast.success("create dentist info success");
        dispatch({
          type: actionTypes.CREATE_DENTIST_INFO_SUCCESS,
        });
      } else {
        toast.error("create dentist info error");
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
        toast.success("create dentist info success");
        dispatch({
          type: actionTypes.CREATE_SCHEDULE_DENTIST_SUCCESS,
        });
      } else {
        toast.error("create dentist info error");
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

export const fetchExtraInfoDentistById = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getExtraInfoDentistByIdService(id);

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_EXTRA_INFO_DENTIST_BY_ID_SUCCESS,
          dataExtraDentist: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_EXTRA_INFO_DENTIST_BY_ID_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_EXTRA_INFO_DENTIST_BY_ID_FAILED,
      });
    }
  };
};

//dichj vuj
// export const createServiceNew = (data) => {
//   return async (dispatch, getState) => {
//     try {
//       console.log(data);
//       let res = await createServiceNewService(data);
//       if (res && res.errCode === 0) {
//         toast.success("create new service success");
//         dispatch({
//           type: actionTypes.CREATE_SERVICE_NEW_SUCCESS,
//         });
//         dispatch(fetchServiceAll());
//       } else {
//         toast.error("create new service error");
//         dispatch({
//           type: actionTypes.CREATE_SERVICE_NEW_FAILED,
//         });
//       }
//     } catch (e) {
//       dispatch({
//         type: actionTypes.CREATE_SERVICE_NEW_FAILED,
//       });
//     }
//   };
// };
// export const fetchServiceAll = () => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await getServiceAllService();

//       if (res && res.errCode === 0) {
//         dispatch({
//           type: actionTypes.FETCH_SERVICE_ALL_SUCCESS,
//           dataService: res.data.reverse(),
//         });
//       } else {
//         dispatch({
//           type: actionTypes.FETCH_SERVICE_ALL_FAILED,
//         });
//       }
//     } catch (e) {
//       dispatch({
//         type: actionTypes.FETCH_SERVICE_ALL_FAILED,
//       });
//     }
//   };
// };

// export const fetchServiceAllLimit = () => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await getServiceAllLimitService(9);

//       if (res && res.errCode === 0) {
//         dispatch({
//           type: actionTypes.FETCH_SERVICE_ALL_LIMIT_SUCCESS,
//           dataServiceLimit: res.data.reverse(),
//         });
//       } else {
//         toast.error("fetch aall user error");
//         dispatch({
//           type: actionTypes.FETCH_SERVICE_ALL_LIMIT_FAILED,
//         });
//       }
//     } catch (e) {
//       dispatch({
//         type: actionTypes.FETCH_SERVICE_ALL_LIMIT_FAILED,
//       });
//     }
//   };
// };
// export const deleteServiceId = (userId) => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await deleteService(userId);
//       console.log(res);
//       if (res && res.errCode === 0) {
//         toast.success("delete service success");
//         dispatch({
//           type: actionTypes.DELETE_SERVICE_SUCCESS,
//         });
//         dispatch(fetchServiceAll());
//       } else {
//         toast.error("delete service error");
//         dispatch({
//           type: actionTypes.DELETE_SERVICE_FAILED,
//         });
//       }
//     } catch (e) {
//       dispatch({
//         type: actionTypes.DELETE_SERVICE_FAILED,
//       });
//     }
//   };
// };
// export const createServiceInfo = (data) => {
//   return async (dispatch, getState) => {
//     try {
//       console.log(data);
//       let res = await createServiceInfoService(data);
//       console.log(res);
//       if (res && res.errCode === 0) {
//         toast.success("create service info success");
//         dispatch({
//           type: actionTypes.CREATE_SERVICE_INFO_SUCCESS,
//         });
//       } else {
//         toast.error("create service info error");
//         dispatch({
//           type: actionTypes.CREATE_SERVICE_INFO_FAILED,
//         });
//       }
//     } catch (e) {
//       dispatch({
//         type: actionTypes.CREATE_SERVICE_INFO_FAILED,
//       });
//     }
//   };
// };
// export const fetchDetailServiceInfo = (id) => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await getDetailServiceInfoService(id);
//       if (res && res.errCode === 0) {
//         dispatch({
//           type: actionTypes.FETCH_DETAIL_SERVICE_INFO_SUCCESS,
//           dataDetailService: res.data,
//         });
//       } else {
//         dispatch({
//           type: actionTypes.FETCH_DETAIL_SERVICE_INFO_FAILED,
//         });
//       }
//     } catch (e) {
//       dispatch({
//         type: actionTypes.FETCH_DETAIL_SERVICE_INFO_FAILED,
//       });
//     }
//   };
// };
