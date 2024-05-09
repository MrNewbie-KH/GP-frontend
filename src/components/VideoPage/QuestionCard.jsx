import { useEffect, useState } from "react";
import RepliesComponent from "./RepliesComponent";
import axios from "axios";
function QuestionCard({ question }) {
  const [voted, setVoted] = useState(question.isLikedByUser);
  const [number, setNumber] = useState(question.numberOfLikes);
  const [openReplies, setOpenReplies] = useState(false);

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
  return (
    <>
      {!openReplies ? (
        <div className="question-card">
          <div className="question-content">
            <img src={question.user.imageUrl} alt="" />
            <h3>
              {question.user.firstName} {question.user.lastName}
            </h3>
            <p>{question.content}</p>
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
          </div>
        </div>
      ) : (
        <RepliesComponent  questionId = {question.id} setShowReplies={setOpenReplies} />
      )}
    </>
  );
}

export default QuestionCard;
