import Viewer from "../components/Viewer";
import { useParams } from "react-router-dom";
import { usePost } from "../components/hooks/usePost";
import usePageTitle from "../components/hooks/usePageTitle";

const Post = () => {
  const params = useParams();
  const curPostItem = usePost(params._id);
  usePageTitle("포스트");
  if (!curPostItem) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  const { createdDate, title, content } = curPostItem;
  const date = new Date(createdDate).toLocaleDateString();
  return (
    <div>
      <Viewer createdDate={date} title={title} content={content}></Viewer>
    </div>
  );
};

export default Post;
