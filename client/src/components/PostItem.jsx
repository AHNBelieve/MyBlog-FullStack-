import "./PostItem.css";
import { useNavigate } from "react-router-dom";
import authBlind from "../../hoc/authBlind";
import Button from "./Button";

const PostItem = ({ id, createdDate, title, content }) => {
  const nav = useNavigate();
  const EditButton = authBlind(Button, "ADMIN");
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title" onClick={() => nav(`/post/${id}`)}>
          {title}
        </h5>
        <h6
          className="card-subtitle mb-2 text-body-secondary"
          onClick={() => nav(`/post/${id}`)}
        >
          {new Date(createdDate).toLocaleDateString()}
        </h6>
        <EditButton
          onClickHandler={() => {
            nav(`/edit/${id}?`);
          }}
          text={"수정하기"}
        />
      </div>
    </div>
  );
};

export default PostItem;
