import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Button from "./Button";
import authBlind from "../../hoc/authBlind";
import { FaTrash } from "react-icons/fa";

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
    <div className="container mx-auto px-4 pt-6">
      <div className="mt-4 bg-white border-2 border-gray-100 shadow-md drop-shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 select-none">
          Comments
        </h2>
        {comments[0] ? (
          <div>
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white border-2 border-gray-100 shadow-sm rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">
                    {comment.writer}
                  </span>
                  <span className="text-sm text-gray-600">
                    {new Date(comment.createdDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
                <div className="flex justify-end">
                  <DeleteButton
                    text=""
                    icon={FaTrash}
                    onClickHandler={() => {
                      onCickDelete(comment._id);
                    }}
                    className="text-md text-red-500 hover:text-red-700"
                    writerCode={comment.writerCode}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h4 className="text-xl font-bold text-blue-300 mb-4 select-none">
              There are no comments here. Start the conversation!
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentList;
