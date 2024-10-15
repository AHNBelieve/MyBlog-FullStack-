import { useNavigate } from "react-router-dom";
import { PostStateContext } from "../../App";
import { useContext, useEffect, useState } from "react";

export const usePost = (id) => {
  const nav = useNavigate();
  const data = useContext(PostStateContext);
  const [curPostItem, setCurrentPostItem] = useState();
  useEffect(() => {
    console.log("RKR");
    const currentPostItem = data.find((item) => String(item.id) === String(id));
    if (!currentPostItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
    setCurrentPostItem(currentPostItem);
  }, [id, data]);
  return curPostItem;
};

export default usePost;
