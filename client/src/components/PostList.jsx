import { PostStateContext } from "../App";
import { useState } from "react";
import PostItem from "./PostItem";

const PostList = ({ data, getFilteredData }) => {
  const [searchSwitch, setSearchSwitch] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  data = getFilteredData(data, searchInput);

  return (
    <div className="PostList">
      <h1>dasd</h1>
      <div className="Search">
        <div className="SearchOn">
          <button
            onClick={() => {
              if (!searchSwitch) setSearchSwitch(1);
              else setSearchSwitch(0);
            }}
          >
            검색기능 켜기!
          </button>
        </div>
        {searchSwitch === 1 && (
          <div className="SearchBar">
            <input
              value={searchInput}
              type="text"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <button
              className="submit"
              onClick={() => {
                getFilteredData(searchInput);
              }}
            >
              검색
            </button>
          </div>
        )}
      </div>
      {data.map((item) => (
        <PostItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default PostList;
