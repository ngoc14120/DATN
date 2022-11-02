import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGenders: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  dentistNew: [],
  allDentist: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGenders = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGenders = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGenders = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_DENTIST_NEW_SUCCESS:
      state.dentistNew = action.dataDentist;
      return {
        ...state,
      };
    case actionTypes.FETCH_DENTIST_NEW_FAILED:
      state.dentistNew = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_DENTIST_ALL_SUCCESS:
      state.allDentist = action.dataDentistAll;
      return {
        ...state,
      };
    case actionTypes.FETCH_DENTIST_ALL_FAILED:
      state.allDentist = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
