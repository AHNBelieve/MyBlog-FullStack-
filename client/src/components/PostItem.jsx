import { useNavigate } from "react-router-dom";
import authBlind from "../../hoc/authBlind";
import Button from "./Button";
import PropTypes from "prop-types";

const PostItem = ({ _id, title, createdDate, writer }) => {
  const nav = useNavigate();
  const EditButton = authBlind(Button, "ADMIN");
  return (
    <div className="card" style={{ width: "auto" }}>
      <div className="card-body">
        <h5 className="card-title" onClick={() => nav(`/post/${_id}`)}>
          {title}
        </h5>
        <h6
          className="card-subtitle mb-2 text-body-secondary"
          onClick={() => nav(`/post/${_id}`)}
        >
          {new Date(createdDate).toLocaleDateString()}
        </h6>
        <h6
          className="card-subtitle mb-2 text-body-secondary"
          onClick={() => nav(`/post/${_id}`)}
        >
          {writer}
        </h6>
        <EditButton
          onClickHandler={() => {
            nav(`/edit/${_id}`);
          }}
          text={"수정하기"}
        />
      </div>
    </div>
  );
};

PostItem.propTypes = {
  _id: PropTypes.string.isRequired, // _id는 필수 string 타입
  title: PropTypes.string.isRequired, // title은 필수 string 타입
  createdDate: PropTypes.number.isRequired, // content는 필수 string 타입
};

export default PostItem;
