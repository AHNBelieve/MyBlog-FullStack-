import Editor from "../components/Editor";
import { useParams } from "react-router-dom";
import { usePost } from "../components/hooks/usePost";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { editPost, deletePost, postLoad } from "../../_actions/post_actions";
import usePageTitle from "../components/hooks/usePageTitle";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const curPostItem = usePost(params._id);
  const dispatch = useDispatch();
  usePageTitle("수정하기");

  const onSubmit = (input) => {
    if (window.confirm("Save?")) {
      console.log("?");
      dispatch(
        editPost({
          _id: curPostItem._id,
          createdDate: input.createdDate.getTime(),
          title: input.title,
          content: input.content,
        })
      ).then(() => {
        nav("/", { replace: true });
      });
    }
  };
  const onClickDelete = () => {
    if (window.confirm("Delete?")) {
      dispatch(deletePost(curPostItem._id)).then(() => {
        dispatch(postLoad);
        nav("/", { replace: true });
      });
    }
    return;
  };
  if (!curPostItem) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  // const { createdDate, title, content } = curPostItem;
  // const date = new Date(createdDate).toLocaleDateString();
  return (
    <div>
      <h4>Edit</h4>
      <Editor initData={curPostItem} onSubmit={onSubmit} />
      <Button onClickHandler={onClickDelete} text="DELETE"></Button>
    </div>
  );
};

export default Edit;
