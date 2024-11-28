import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authBlind from "../../hoc/authBlind";
import Button from "./Button";

const Viewer = ({ _id, createdDate, title, content, writer, writerCode }) => {
  //createdDate 활용 해야한다.
  const nav = useNavigate();
  const EditButton = authBlind(Button, "ADMIN", writerCode);
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="bg-white shadow-xl rounded-lg drop-shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-8">
            <span>By {writer}</span>

            <span>{new Date(createdDate).toLocaleDateString()}</span>
          </div>
          <div className="prose max-w-none">{content}</div>
          <div className="flex justify-end items-center text-sm text-gray-600 mb-8">
            <EditButton
              onClickHandler={() => {
                nav(`/edit/${_id}`);
              }}
              text="Edit"
              icon={FaEdit}
              className="text-white-500 hover:bg-gray-100"
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default Viewer;
