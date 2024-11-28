import { useNavigate } from "react-router-dom";
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
    </div>
  );
};

export default Home;
