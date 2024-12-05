import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Footer from "./components/Footer";
import { setPageNumber, setSearchQuery } from "../_actions/config_action";

function App() {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);

  useEffect(() => {
    // 페이지 번호를 1로 초기화
    dispatch(setPageNumber(1));
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        dispatch(postLoad(config));
      } catch (err) {
        console.log(err);
      }
    };

    // pageNumber가 변경될 때만 서버에서 데이터 로드
    if (config.pageNumber > 0) {
      loadPosts();
    }
  }, [dispatch, config.pageNumber, config.searchQuery]);

  return (
    <div className="app-container">
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
