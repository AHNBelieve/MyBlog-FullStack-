import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostList from "../components/PostList";
import authBlind from "../../hoc/authBlind";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { postLoad } from "../../_actions/post_actions";
import { useEffect } from "react";

const Home = () => {
  const data = useSelector((state) => state.post);
  const nav = useNavigate();
  const NewPostButton = authBlind(Button, "ADMIN");
  const reduxDispatch = useDispatch();
  useEffect(() => {
    reduxDispatch(postLoad())
      .then((response) => {
        // payload에서 데이터 가져오기
        console.log("현재 포스트: ", response.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reduxDispatch]);

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
