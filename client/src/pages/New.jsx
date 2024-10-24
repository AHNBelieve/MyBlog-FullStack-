import Editor from "../components/Editor";
import { useContext } from "react";
import { PostDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";

const New = () => {
  const { onCreate } = useContext(PostDispatchContext);

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.title, input.content);
    console.log(input);
    nav("/", { replace: true });
  };
  const nav = useNavigate();
  return (
    <div>
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
