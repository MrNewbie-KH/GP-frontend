import { useEffect, useState } from "react";
import RepliesComponent from "./RepliesComponent";
import EditComponent from "./EditComponent";
import axios from "axios";
function QuestionCard({ question, reload }) {
  const [voted, setVoted] = useState(question.isLikedByUser);
  const [number, setNumber] = useState(question.numberOfLikes);
  const [content, setContent] = useState(question.content);
  const [openReplies, setOpenReplies] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);
  const token = localStorage.getItem("token");
  function toggleVotes() {
    setVoted(!voted);
    voted ? disLike() : like();
  }
  const like = async () => {
    setNumber(number + 1);
    try {
      const response = await axios.post(
        `https://e-learning-platform-uwoj.onrender.com/comment/like-comment/{commentId}?commentId=${question.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const disLike = async () => {
    setNumber(number - 1);
    try {
      const response = await axios.delete(
        `https://e-learning-platform-uwoj.onrender.com/comment/remove-like-comment/{commentId}?commentId=${question.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteQuestion = async () => {
    try {
      const response = await axios.delete(
        `https://e-learning-platform-uwoj.onrender.com/comment/delete-comment/{commentId}?commentId=${question.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      reload();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      {
        <div className="question-card">
          <div className="question-content">
            <img src={question.user.imageUrl} alt="" />
            <div className="question-info">
              <h3>
                {question.user.firstName} {question.user.lastName}
              </h3>
              <p>{question.content}</p>
            </div>
          </div>
          <div className="numbers-reply-votes">
            <div className="number-svg" onClick={toggleVotes}>
              {voted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
              <span>{number}</span>
            </div>
            <div className="number-svg" onClick={() => setOpenReplies(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              <span>{question.numberOfReplyes}</span>
            </div>
            {question.isCreatedByUser && (
              <div className="edit-delete-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => setEditQuestion(true)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="w-6 h-6"
                  onClick={deleteQuestion}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      }
      {editQuestion && (
        <EditComponent
          type={"question"}
          setEdit={setEditQuestion}
          content={content}
          setContent={setContent}
          id={question.id}
          reload={reload}
        />
      )}
      {openReplies && (
        <RepliesComponent
          questionId={question.id}
          setShowReplies={setOpenReplies}
        />
      )}
    </>
  );
}

export default QuestionCard;
