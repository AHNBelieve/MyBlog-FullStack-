import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostList from "../components/PostList";
import authBlind from "../../hoc/authBlind";
import Button from "../components/Button";

const Home = () => {
  const data = useSelector((state) => state.post);
  const nav = useNavigate();
  const NewPostButton = authBlind(Button, "ADMIN");

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
      <NewPostButton
        onClickHandler={() => {
          nav("/new");
        }}
        text="NewPost"
      ></NewPostButton>
    </div>
  );
};

export default Home;
