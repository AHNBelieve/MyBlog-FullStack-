import Header from "../components/Header";
import Viewer from "../components/Viewer";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";
import { usePost } from "../components/hooks/usePost";
import { PostDispatchContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

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
    if (window.confirm("삭제한다 찐으로 ?")) {
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
      <Header></Header>
      <h1>일기 수정하기</h1>
      <Editor initData={curPostItem} onSubmit={onSubmit} />
      <button onClick={onClickDelete}>삭제버튼</button>
    </div>
  );
};

export default Edit;
