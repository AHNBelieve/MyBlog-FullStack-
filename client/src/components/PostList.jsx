import { useState } from "react";
import PostItem from "./PostItem";
import PropTypes from "prop-types";

const PostList = ({ getFilteredData, data }) => {
  const [searchSwitch, setSearchSwitch] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  data = getFilteredData(data, searchInput);

  return (
    <div>
      <div className="input-group mb-3">
        <button
          onClick={() => {
            if (!searchSwitch) setSearchSwitch(1);
            else setSearchSwitch(0);
          }}
          className="input-group-text"
          id="inputGroup-sizing-default"
        >
          Search
        </button>
        {searchSwitch === 1 && (
          <input
            value={searchInput}
            type="text"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
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
