import React, { useEffect, useState } from "react";

function CommentList({ comments, setComments, postId }) {
  const [loading, setLoading] = useState(1);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL
          ? `${import.meta.env.VITE_API_URL}/api/post/${postId}/comments`
          : `/api/post/${postId}/comments`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) {
    return <div>로딩~</div>;
  }
  return (
    <div>
      <h3>Comments</h3>
      {comments.length === 0 && (
        <p>No comments yet. Be the first to comment!</p>
      )}
      {comments.map((comment) => (
        <div key={comment._id} style={{ marginBottom: "1rem" }}>
          <p>
            <strong>{comment.writer}</strong>: {comment.content}
          </p>
          <small>{new Date(comment.createdDate).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
