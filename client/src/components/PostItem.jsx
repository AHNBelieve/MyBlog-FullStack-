import { useNavigate } from "react-router-dom";
import authBlind from "../../hoc/authBlind";
import Button from "./Button";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";

const PostItem = ({
  _id,
  title,
  createdDate,
  writer,
  writerCode,
  commentCount,
}) => {
  const nav = useNavigate();
  const EditButton = authBlind(Button, "ADMIN", writerCode);
  return (
    <div
      className="bg-white border-2 border-gray-100 shadow-lg rounded-lg p-6 relative hover:bg-gray-50 cursor-pointer select-none"
      onClick={() => nav(`/post/${_id}`)}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {title + ` (${commentCount})`}
      </h2>
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>By {writer}</span>
        <span>{new Date(createdDate).toLocaleDateString()}</span>
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
