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
      console.log(res);
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
