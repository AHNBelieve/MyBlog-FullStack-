import Editor from "../components/Editor";
import { useParams } from "react-router-dom";
import { usePost } from "../components/hooks/usePost";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { editPost, deletePost, postLoad } from "../../_actions/post_actions";
import usePageTitle from "../components/hooks/usePageTitle";
import Loading from "../components/Loading";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const curPostItem = usePost(params._id);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  usePageTitle("수정하기");

  const onSubmit = (input) => {
    if (window.confirm("Save?")) {
      dispatch(
        editPost({
          _id: curPostItem._id,
          createdDate: input.createdDate.getTime(),
          title: input.title,
          content: input.content,
        })
      ).then(() => {
        dispatch(postLoad);
        nav("/");
        window.location.reload();
      });
    }
    return;
  };
  const onClickDelete = () => {
    if (window.confirm("Delete?")) {
      dispatch(deletePost(curPostItem._id)).then(() => {
        dispatch(postLoad);
        nav("/");
        window.location.reload();
      });
    }
    return;
  };
  if (!curPostItem) {
    return <Loading></Loading>;
  }
  if (userData && curPostItem.writerCode !== userData._id) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h4>Edit</h4>
      <Editor initData={curPostItem} onSubmit={onSubmit} />
      <Button onClickHandler={onClickDelete} text="DELETE"></Button>
    </div>
  );
};

export default Edit;
