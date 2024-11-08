import { useState } from "react";
import PostItem from "./PostItem";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPageNumber } from "../../_actions/config_action";
const PostList = ({ getFilteredData, data }) => {
  const [searchSwitch, setSearchSwitch] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  data = getFilteredData(data, searchInput);
  const config = useSelector((state) => state.config);

  console.log(config);
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    // 페이지 하단에 정확히 도달했을 때만 다음 페이지 로드
    // 스크롤이 하단에 거의 도달했을 때 페이지 로드
    if (scrollTop + windowHeight >= documentHeight - 1) {
      dispatch(setPageNumber(config.pageNumber + 1));
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 등록
    window.addEventListener("scroll", handleScroll);

    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, [config.pageNumber]);

  return (
    <div>
      <div className="input-group mb-3">
        <button
          onClick={() => setSearchSwitch((prev) => (prev === 0 ? 1 : 0))}
          className="input-group-text"
          id="inputGroup-sizing-default"
        >
          Search
        </button>
        {searchSwitch === 1 && (
          <input
            value={searchInput}
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            style={{
              border: "2px solid gray",
              padding: "5px",
            }}
          />
        )}
      </div>
      {data.map((item) => (
        <PostItem key={item._id} {...item} />
      ))}
    </div>
  );
};

PostList.propTypes = {
  data: PropTypes.array.isRequired,
  getFilteredData: PropTypes.func.isRequired,
};

export default PostList;
