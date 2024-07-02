import axios from "axios";
import { useState } from "react";
import AddQuestion from "./AddQuestion";
import EditComponent from "./EditComponent";
function ReplyCard({ data, reload }) {
  const [voted, setVoted] = useState(data.isLikedByUser);
  const token = localStorage.getItem("token");
  const [content, setContent] = useState(data.content);
  const [number, setNumber] = useState(data.numberOfLikes);
  const [edit, setEdit] = useState(false);

  function toggleVotes() {
    setVoted(!voted);
    voted ? disLike() : like();
  }
  // --------------------
  const like = async () => {
    setNumber(number + 1);
    try {
      const response = await axios.get(
        `https://e-learning-platform-uwoj.onrender.com/reply/like-reply?replyId=${data.id}`,
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
      const response = await axios.get(
        `https://e-learning-platform-uwoj.onrender.com/reply/remove-like-reply?replyId=${data.id}`,
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
  const updateReply = async () => {
    try {
      const response = await axios.post(
        `https://e-learning-platform-uwoj.onrender.com/reply/update-reply`,
        {
          content: content,
          replyId: data.id,
        },
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
  const deleteReply = async () => {
    try {
      const response = await axios.delete(
        `https://e-learning-platform-uwoj.onrender.com/reply/delete-reply?replyId=${data.id}`,
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

  // --------------------
  return (
    <>
      {edit ? (
        <EditComponent
          type={"reply"}
          setEdit={setEdit}
          content={content}
          setContent={setContent}
          id={data.id}
          reload={reload}
        />
      ) : (
        <div className="reply-card">
          <div className="reply-card-left">
            <img src={data.user.imageUrl} alt="User who replied here" />
            <div>
              <h2>{data.user.firstName}</h2>
              <p>{data.content}</p>
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
              {number}
            </div>

            {data.isCreatedByUser && (
              <div className="edit-delete-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => setEdit(true)}
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
                  onClick={deleteReply}
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
      )}
    </>
  );
}
export default ReplyCard;
