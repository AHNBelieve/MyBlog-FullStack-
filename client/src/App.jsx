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

// 적용 됐는지 확인!
//Reducer
// function reducer(state, action) {
//   let nextState;

//   switch (action.type) {
//     case "INIT": {
//       return action.data;
//     }
//     case "CREATE": {
//       nextState = [action.data, ...state];
//       return nextState;
//     }
//     case "UPDATE": {
//       nextState = state.map((item) =>
//         String(item.id) === String(action.data.id) ? action.data : item
//       );
//       break;
//     }
//     case "DELETE": {
//       nextState = state.filter((item) => String(item.id) !== String(action.id));
//       break;
//     }
//     default:
//       return state;
//   }
//   localStorage.setItem("Post", JSON.stringify(nextState));
//   return nextState;
// }

function App() {
  console.log(import.meta.env);
  const dispatch = useDispatch();
  const page = useRef(1);
  //배포 서버 연결 작업 테스트
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/endpoint`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        console.log(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
