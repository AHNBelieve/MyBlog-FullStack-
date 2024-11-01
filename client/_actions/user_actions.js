import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${import.meta.env.VITE_API_URL}/api/users/login`, dataToSubmit)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      throw Error(err.response.data.message);
    });
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${import.meta.env.VITE_API_URL}/api/users/register`, dataToSubmit)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${import.meta.env.VITE_API_URL}/api/users/auth`)
    .then((response) => response.data)
    .catch((err) => err);
  return {
    type: AUTH_USER,
    payload: request,
  };
}

//추가적으로 개발한 로그아웃 액션함수
export function logoutUser() {
  const request = axios
    .get(`${import.meta.env.VITE_API_URL}api/users/logout`)
    .then((response) => response.data)
    .catch((err) => {
      alert(err.message);
    });
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
