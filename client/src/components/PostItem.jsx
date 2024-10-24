import "./PostItem.css";
import { useNavigate } from "react-router-dom";
import authBlind from "../../hoc/authBlind";
import Button from "./Button";

const PostItem = ({ id, createdDate, title, content }) => {
  const nav = useNavigate();
  const EditButton = authBlind(Button, "ADMIN");
  return (
    <div className="PostItem">
      <h1 onClick={() => nav(`/post/${id}`)}>{title}</h1>
      <h5 onClick={() => nav(`/post/${id}`)}>
        {new Date(createdDate).toLocaleDateString()}
      </h5>
      <EditButton
        onClickHandler={() => {
          nav(`/edit/${id}?`);
        }}
        text={"수정하기"}
      />
    </div>
  );
};

export default PostItem;
