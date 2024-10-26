import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useReducer, useRef, createContext } from "react";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import New from "./pages/New";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Edit";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import auth from "../hoc/auth";
import Header from "./components/Header";
import { newPost, postLoad } from "../_actions/post_actions";
import { useEffect } from "react";

export const PostStateContext = createContext();
export const PostDispatchContext = createContext();

// 적용 됐는지 확인!
//Reducer
function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      nextState = [action.data, ...state];
      return nextState;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("Post", JSON.stringify(nextState));
  return nextState;
}

function App() {
  // const reduxDispatch = useDispatch();
  // useEffect(() => {
  //   reduxDispatch(postLoad())
  //     .then((response) => {
  //       // payload에서 데이터 가져오기
  //       console.log("현재 포스트: ", response.value);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [reduxDispatch]); // reduxDispatch가 변경될 때만 실행

  //dispatches

  return (
    <>
      <Header></Header>
      <div className="main">
        <Routes>
          <Route path="/" element={auth(Home, null)} />
          <Route path="/new" element={auth(New, true, true)} />
          <Route path="/post/:_id" element={auth(Post, null)} />
          <Route path="*" element={<NotFound />} />
          <Route path="/edit/:_id" element={auth(Edit, true, true)} />
          <Route path="/login" element={auth(LoginPage, false)} />
          <Route path="/register" element={auth(RegisterPage, false)} />
        </Routes>
      </div>
    </>
  );
}

export default App;
