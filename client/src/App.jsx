import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useReducer, useRef, createContext } from "react";

import Home from "./pages/Home";
import New from "./pages/New";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Edit";
import LoginPage from "./pages/LoginPage";

export const PostStateContext = createContext();
export const PostDispatchContext = createContext();

// 적용 됐는지 확인!
const mockData = [
  {
    id: 1,
    createdDate: new Date(),
    title: "야스오는 최고야",
    content: "첫 번째 포스트",
  },
  {
    id: 2,
    createdDate: new Date(),
    title: "요네는 멋져",
    content: "두 번째 포스트",
  },
  {
    id: 3,
    createdDate: new Date(),
    title: "겐지는 벌레야",
    content: "세 번째 포스트",
  },
];

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
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);

  //dispatches
  const onCreate = (createdDate, title, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        title,
        content,
      },
    });
  };
  const onUpdate = (id, createdDate, title, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        title,
        content,
      },
    });
  };
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };
  return (
    <>
      <PostStateContext.Provider value={data}>
        <PostDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/new" element={<New></New>} />
            <Route path="/post/:id" element={<Post></Post>} />
            <Route path="*" element={<NotFound></NotFound>} />
            <Route path="/edit/:id" element={<Edit></Edit>} />
            <Route path="/login" element={<LoginPage></LoginPage>} />
          </Routes>
        </PostDispatchContext.Provider>
      </PostStateContext.Provider>
    </>
  );
}

export default App;
