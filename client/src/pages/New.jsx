import Editor from "../components/Editor";
import Header from "../components/Header";
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
      <Header></Header>
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
