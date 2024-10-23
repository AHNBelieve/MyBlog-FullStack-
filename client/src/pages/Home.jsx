import { useNavigate } from "react-router-dom";
import { PostStateContext } from "../App";
import { useContext, useState } from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";

const Home = () => {
  const data = useContext(PostStateContext);
  const nav = useNavigate();

  const getFilteredData = (data, input) => {
    return data.filter((item) => {
      return (
        item.content.toLowerCase().includes(input.toLowerCase()) ||
        item.title.toLowerCase().includes(input.toLowerCase())
      );
    });
  };

  return (
    <div>
      <Header></Header>
      <PostList getFilteredData={getFilteredData} data={data}></PostList>
      <h1></h1>
      <button
        onClick={() => {
          nav("/new");
        }}
      >
        New Post
      </button>
    </div>
  );
};

export default Home;
