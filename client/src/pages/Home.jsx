import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostList from "../components/PostList";
import authBlind from "../../hoc/authBlind";
import Button from "../components/Button";
import usePageTitle from "../components/hooks/usePageTitle";

const Home = () => {
  const nav = useNavigate();
  const NewPostButton = authBlind(Button, "ADMIN");
  usePageTitle("안현준의 블로그!");
  return (
    <div>
      <PostList></PostList>
      <NewPostButton
        onClickHandler={() => {
          nav("/new");
        }}
        text="NewPost"
      ></NewPostButton>
      <h3 style={{ marginTop: "100px", marginBottom: "100px" }}>
        아래로 당기면 더 많은 포스트가 로드됩니다.
      </h3>
    </div>
  );
};

export default Home;
