import Viewer from "../components/Viewer";
import { useParams } from "react-router-dom";
import { usePost } from "../components/hooks/usePost";
import usePageTitle from "../components/hooks/usePageTitle";
import CommentList from "../components/CommentList";
import authBlind from "../../hoc/authBlind";
import CommentForm from "../components/CommentForm";
import { useState } from "react";

const Post = () => {
  const params = useParams();
  const curPostItem = usePost(params._id);
  const [comments, setComments] = useState([]);
  usePageTitle("포스트");
  const NewCommentForm = authBlind(CommentForm, "USER");

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]); // 새 댓글 추가
  };

  if (!curPostItem) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  //이 밑에서부터는 이 데이터가 있기에!
  const { createdDate, title, content, writer } = curPostItem;
  const date = new Date(createdDate).toLocaleDateString();
  return (
    <div>
      <Viewer
        createdDate={date}
        title={title}
        content={content}
        writer={writer}
      ></Viewer>
      <div>
        <CommentList
          comments={comments}
          setComments={setComments}
          postId={curPostItem._id}
        ></CommentList>
        <NewCommentForm
          onCommentAdded={handleCommentAdded}
          postId={curPostItem._id}
        ></NewCommentForm>
      </div>
    </div>
  );
};

export default Post;
