import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "../_actions/types";

const initialState = {
  loginSuccess: false,
  register: null,
  userData: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case `${LOGIN_USER}_PENDING`:
      return state;
    case `${LOGIN_USER}_FULFILLED`:
      // 요청이 시작될 때 상태 업데이트
      console.log(action.payload);
      return { ...state, loginSuccess: true };
    case `${REGISTER_USER}_FULFILLED`:
      return { ...state, register: action.payload };
    case `${AUTH_USER}_PENDING`:
      return state;
    case `${AUTH_USER}_FULFILLED`:
      if (action.payload.status === 401) {
        return state;
      }
      return { ...state, loginSuccess: true, userData: action.payload };
    case `${AUTH_USER}_REJECTED`:
      return state;
    case `${LOGOUT_USER}_PENDING`:
      return state;
    case `${LOGOUT_USER}_FULFILLED`:
      return initialState;
    default:
      return state;
  }
}
