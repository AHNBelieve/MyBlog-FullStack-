import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Button from "./Button";

function CommentForm({ postId, onCommentAdded }) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const userData = useSelector((state) => state.user.userData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL
          ? `${import.meta.env.VITE_API_URL}/api/post/${postId}/comment/new`
          : `/api/post/${postId}/comment/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            writer: userData.name,
            writerCode: userData._id,
            content,
            createdDate: new Date().getTime(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }
      const newComment = await response.json();
      onCommentAdded(newComment);
      setContent(""); // 입력 필드 초기화
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="mt-4 border-2 border-gray-100 bg-white shadow-xl drop-shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a Comment</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          rows="4"
          placeholder="Write your comment here..."
          required
        ></textarea>
        <div className="flex justify-end mt-2">
          {loading ? (
            <Button
              text="Submit Comment"
              className="mt-2 bg-gray-500 text-white"
            />
          ) : (
            <Button
              text="Submit Comment"
              onClick={handleSubmit}
              className="mt-2 bg-blue-500 text-white hover:bg-blue-700"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
