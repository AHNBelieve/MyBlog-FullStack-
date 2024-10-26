import { useDispatch } from "react-redux";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { newPost } from "../../_actions/post_actions";

const New = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const onSubmit = (input) => {
    dispatch(
      newPost({
        createdDate: input.createdDate.getTime(),
        title: input.title,
        content: input.content,
      })
    ).then((response) => {
      console.log(response);
      nav("/", { replace: true });
    });
  };

  return (
    <div>
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
