import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Button from "./Button";
import authBlind from "../../hoc/authBlind";

function CommentList({ comments, setComments, postId }) {
  const [loading, setLoading] = useState(1);
  const DeleteButton = authBlind(Button, "USER");

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

  const onCickDelete = async (_id) => {
    setLoading(true);
    if (window.confirm("너가 싼 똥을 너 손으로 주워 담는구나.")) {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL
            ? `${import.meta.env.VITE_API_URL}/api/comment/delete/${_id}`
            : `/api/comment/delete/${_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          // 삭제가 성공하면 댓글 목록을 새로 고침
          window.location.reload();
        } else {
          console.log("Error deleting comment");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) {
    return <Loading></Loading>;
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
          <DeleteButton
            onClickHandler={() => {
              onCickDelete(comment._id);
            }}
            text={"Delete"}
            writerCode={comment.writerCode}
          ></DeleteButton>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
