import Editor from "../components/Editor";
import { useParams } from "react-router-dom";
import { usePost } from "../components/hooks/usePost";
import { PostDispatchContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const curPostItem = usePost(params.id);
  const { onDelete, onUpdate } = useContext(PostDispatchContext);

  const onSubmit = (input) => {
    if (window.confirm("이거 ㄹㅇ 수정할거임?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.title,
        input.content
      );
      nav("/", { replace: true });
    }
  };
  const onClickDelete = () => {
    if (window.confirm("이 게시글을 삭제할까요?")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
    return;
  };
  if (!curPostItem) {
    return <div>로딩중</div>;
  }
  const { createdDate, title, content } = curPostItem;
  const date = new Date(createdDate).toLocaleDateString();
  return (
    <div>
      <h4>Edit</h4>
      <Editor initData={curPostItem} onSubmit={onSubmit} />
      <Button onClickHandler={onClickDelete} text="DELETE"></Button>
    </div>
  );
};

export default Edit;
