import Viewer from "../components/Viewer";
import { useParams } from "react-router-dom";
import { usePost } from "../components/hooks/usePost";

const Post = () => {
  const params = useParams();
  const curPostItem = usePost(params._id);
  console.log(curPostItem);
  if (!curPostItem) {
    return <div>Loading...</div>;
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
