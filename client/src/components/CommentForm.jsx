import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

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
      setWriter("");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Comment:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
