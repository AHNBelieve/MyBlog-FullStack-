import { useDispatch, useSelector } from "react-redux";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { newPost } from "../../_actions/post_actions";
import usePageTitle from "../components/hooks/usePageTitle";
import { postLoad } from "../../_actions/post_actions";

const New = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  usePageTitle("새로운 포스트");
  const onSubmit = (input) => {
    console.log(user);
    dispatch(
      newPost({
        createdDate: input.createdDate.getTime(),
        title: input.title,
        content: input.content,
        writer: user.userData.name,
        writerCode: user.userData._id,
        commentCount: 0,
      })
    ).then(() => {
      dispatch(postLoad);
      nav("/");
      window.location.reload();
    });
  };

  return (
    <div>
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
