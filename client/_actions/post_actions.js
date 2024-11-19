import axios from "axios";
import { LOAD_POST, DELETE_POST, EDIT_POST, NEW_POST } from "./types";

export function postLoad(config = { pageNumber: 1, searchQuery: "" }) {
  console.log(config);
  const request = axios
    .get(
      import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/post/load?page=${
            config.pageNumber
          }&query=${config.searchQuery}`
        : `/api/post/load?page=${config.pageNumber}&query=${config.searchQuery}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      throw Error(err.response.data.message);
    });
  return {
    type: LOAD_POST,
    payload: request,
  };
}
//여기부터.
export function newPost(dataToSubmit) {
  const request = axios
    .post(
      import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/post/new`
        : "/api/post/new",
      dataToSubmit
    )
    .then((response) => response.data);
  return {
    type: NEW_POST,
    payload: request,
  };
}

export function editPost(dataTosubmit) {
  const request = axios
    .post(
      import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/post/edit`
        : "/api/post/edit",
      dataTosubmit
    )
    .then((response) => response.data)
    .catch((err) => err);
  return {
    type: EDIT_POST,
    payload: request,
  };
}

//추가적으로 개발한 로그아웃 액션함수
export function deletePost(id) {
  const request = axios
    .delete(
      import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/post/delete/${id}`
        : `/api/post/delete/${id}`
    )
    .then((response) => response.data)
    .catch((err) => {
      alert(err.response.data.message || "An error occurred");
    });

  return {
    type: DELETE_POST,
    payload: request,
  };
}
