import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const usePost = (_id) => {
  const nav = useNavigate();
  const data = useSelector((state) => state.post.post);
  const [curPostItem, setCurrentPostItem] = useState();
  useEffect(() => {
    const currentPostItem = data.find(
      (item) => String(item._id) === String(_id)
    );
    if (!currentPostItem) {
      window.alert("존재하지 않는 포스트입니다.");
      nav("/", { replace: true });
    }
    setCurrentPostItem(currentPostItem);
  }, [_id, data, nav]);
  return curPostItem;
};

export default usePost;
