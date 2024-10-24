import { useNavigate } from "react-router-dom";
import { PostStateContext } from "../App";
import { useContext } from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { useSelector } from "react-redux";

const Home = () => {
  const data = useContext(PostStateContext);
  const nav = useNavigate();
  const user = useSelector((state) => state.user);

  const getFilteredData = (data, input) => {
    return data.filter((item) => {
      return (
        item.content.toLowerCase().includes(input.toLowerCase()) ||
        item.title.toLowerCase().includes(input.toLowerCase())
      );
    });
  };

  return (
    <div>
      <PostList getFilteredData={getFilteredData} data={data}></PostList>
      <h1></h1>
      {/*아래는 어드민만 보이도록 하는 버튼 설정법! Redux활용!*/}
      {user.loginSuccess && user.userData.isAdmin && (
        <button
          onClick={() => {
            nav("/new");
          }}
        >
          New Post
        </button>
      )}
    </div>
  );
};

export default Home;
