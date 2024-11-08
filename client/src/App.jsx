import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { postLoad } from "../_actions/post_actions";

import Home from "./pages/Home";
import New from "./pages/New";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Edit";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import auth from "../hoc/auth";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const page = useRef(1);

  useEffect(() => {
    dispatch(postLoad(page))
      .then((response) => {
        // payload에서 데이터 가져오기
        console.log("현재 포스트: ", response.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, page]);

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
