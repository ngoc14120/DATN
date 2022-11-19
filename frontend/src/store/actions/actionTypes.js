const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",
  USER_REGISTER_FAILED: "USER_REGISTER_FAILED",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //ADMIN actions
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",

  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAILED: "FETCH_POSITION_FAILED",

  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",

  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAILED: "CREATE_USER_FAILED",

  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILED: "DELETE_USER_FAILED",

  FETCH_ALL_USER_SUCCESS: "FETCH_ALL_USER_SUCCESS",
  FETCH_ALL_USER_FAILED: "FETCH_ALL_USER_FAILED",

  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILED: "EDIT_USER_FAILED",

  FETCH_DENTIST_NEW_SUCCESS: "FETCH_DENTIST_NEW_SUCCESS",
  FETCH_DENTIST_NEW_FAILED: "FETCH_DENTIST_NEW_FAILED",

  FETCH_DENTIST_ALL_SUCCESS: "FETCH_DENTIST_ALL_SUCCESS",
  FETCH_DENTIST_ALL_FAILED: "FETCH_DENTIST_ALL_FAILED",

  CREATE_DENTIST_INFO_SUCCESS: "CREATE_DENTIST_INFO_SUCCESS",
  CREATE_DENTIST_INFO_FAILED: "CREATE_DENTIST_INFO_FAILED",

  FETCH_DETAIL_DENTIST_INFO_SUCCESS: "FETCH_DETAIL_DENTIST_INFO_SUCCESS",
  FETCH_DETAIL_DENTIST_INFO_FAILED: "FETCH_DETAIL_DENTIST_INFO_FAILED",

  FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: "FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS",
  FETCH_ALLCODE_SCHEDULE_TIME_FAILED: "FETCH_ALLCODE_SCHEDULE_TIME_FAILED",

  CREATE_SCHEDULE_DENTIST_SUCCESS: "CREATE_SCHEDULE_DENTIST_SUCCESS",
  CREATE_SCHEDULE_DENTIST_FAILED: "CREATE_SCHEDULE_DENTIST_FAILED",

  FETCH_SCHEDULE_DENTIST_BY_DATE_SUCCESS:
    "FETCH_SCHEDULE_DENTIST_BY_DATE_SUCCESS",
  FETCH_SCHEDULE_DENTIST_BY_DATE_FAILED:
    "FETCH_SCHEDULE_DENTIST_BY_DATE_FAILED",

  FETCH_REQUIRED_DENTIST_INFO_START: "FETCH_REQUIRED_DENTIST_INFO_START",
  FETCH_REQUIRED_DENTIST_INFO_SUCCESS: "FETCH_REQUIRED_DENTIST_INFO_SUCCESS",
  FETCH_REQUIRED_DENTIST_INFO_FAILED: "FETCH_REQUIRED_DENTIST_INFO_FAILED",

  FETCH_EXTRA_INFO_DENTIST_BY_ID_SUCCESS:
    "FETCH_EXTRA_INFO_DENTIST_BY_ID_SUCCESS",
  FETCH_EXTRA_INFO_DENTIST_BY_ID_FAILED:
    "FETCH_EXTRA_INFO_DENTIST_BY_ID_FAILED",

  // action dichj vu
  CREATE_SERVICE_NEW_SUCCESS: "CREATE_SERVICE_NEW_SUCCESS",
  CREATE_SERVICE_NEW_FAILED: "CREATE_SERVICE_NEW_FAILED",
  FETCH_SERVICE_ALL_SUCCESS: "FETCH_SERVICE_ALL_SUCCESS",
  FETCH_SERVICE_ALL_FAILED: "FETCH_SERVICE_ALL_FAILED",
  FETCH_SERVICE_ALL_LIMIT_SUCCESS: "FETCH_SERVICE_ALL_LIMIT_SUCCESS",
  FETCH_SERVICE_ALL_LIMIT_FAILED: "FETCH_SERVICE_ALL_LIMIT_FAILED",
  DELETE_SERVICE_SUCCESS: "DELETE_SERVICE_SUCCESS",
  DELETE_SERVICE_FAILED: "DELETE_SERVICE_FAILED",
  CREATE_SERVICE_INFO_SUCCESS: "CREATE_SERVICE_INFO_SUCCESS",
  CREATE_SERVICE_INFO_FAILED: "CREATE_SERVICE_INFO_FAILED",
  FETCH_DETAIL_SERVICE_INFO_SUCCESS: "FETCH_DETAIL_SERVICE_INFO_SUCCESS",
  FETCH_DETAIL_SERVICE_INFO_FAILED: "FETCH_DETAIL_SERVICE_INFO_FAILED",

  //booking
  BOOKING_PATIENT_SUCCESS: "BOOKING_PATIENT_SUCCESS",
  BOOKING_PATIENT_FAILED: "BOOKING_PATIENT_FAILED",
});

export default actionTypes;
