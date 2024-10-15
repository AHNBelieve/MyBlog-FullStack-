import Header from "../components/Header";
import Viewer from "../components/Viewer";
import { useParams } from "react-router-dom";
import { usePost } from "../components/hooks/usePost";

const Post = () => {
  const params = useParams();
  const curPostItem = usePost(params.id);

  if (!curPostItem) {
    return <div>로딩중</div>;
  }
  const { createdDate, title, content } = curPostItem;
  const date = new Date(createdDate).toLocaleDateString();
  return (
    <div>
      <Header></Header>
      <Viewer createdDate={date} title={title} content={content}></Viewer>
    </div>
  );
};

export default Post;
