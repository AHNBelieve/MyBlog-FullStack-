import { useState, useEffect, useRef } from "react";
import PostItem from "./PostItem";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../../_actions/config_action";
import Loading from "./Loading";
import authBlind from "../../hoc/authBlind";
import Button from "../components/Button";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.post);
  const config = useSelector((state) => state.config);
  const NewPostButton = authBlind(Button, "ADMIN");

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    // 페이지 하단에 도달했을 때만 다음 페이지 요청
    if (scrollTop + windowHeight >= documentHeight - 10 && !loading) {
      setLoading(true); // 요청이 시작되었음을 표시
      dispatch(setPageNumber(config.pageNumber + 1));
    }
  };
  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, config.pageNumber]); // 로딩 상태 또는 페이지 번호 변경 시 재등록
  // 페이지 번호 변경 시 데이터 로드 후 로딩 상태 해제
  useEffect(() => {
    if (loading) {
      // 새로운 데이터가 로드되면 로딩 상태 해제
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 select-none">
          Latest Posts
        </h2>
        <NewPostButton
          onClickHandler={() => {
            nav("/new");
          }}
          text="Create Post"
          icon={FaPlus}
          className="bg-green-500 text-white hover:bg-green-600"
        ></NewPostButton>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {data.map((item) => (
          <PostItem key={item._id} {...item} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <div className="flex items-center justify-center space-x-10">
          <FaSpinner className="animate-spin text-blue-500" />
          <span className="text-gray-600">Loading more posts...</span>
        </div>
      </div>
    </div>
  );
};

export default PostList;
