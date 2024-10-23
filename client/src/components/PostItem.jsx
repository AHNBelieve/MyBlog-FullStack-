import "./PostItem.css";
import { useNavigate } from "react-router-dom";
import authBlind from "../../hoc/authBlind";

const PostItem = ({ id, createdDate, title, content }) => {
  const nav = useNavigate();
  return (
    <div className="PostItem">
      <h1 onClick={() => nav(`/post/${id}`)}>{title}</h1>
      <h5 onClick={() => nav(`/post/${id}`)}>
        {new Date(createdDate).toLocaleDateString()}
      </h5>
      <button
        onClick={() => {
          nav(`/edit/${id}`);
        }}
      >
        수정하기
      </button>
    </div>
  );
};

export default PostItem;
