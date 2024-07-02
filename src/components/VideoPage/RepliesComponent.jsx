import ReplyCard from "./ReplyCard";
import SeeMore from "./SeeMore";
import AddQuestion from "./AddQuestion";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader";

function RepliesComponent({ questionId, setShowReplies }) {
  const token = localStorage.getItem("token");
  const [addReply, setAddReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [page, setPage] = useState(0); // Current page number
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const re = () => {
    setReload((reload) => !reload);
  };

  const getReplies = async function (id) {
    try {
      const response = await axios.get(
        `https://e-learning-platform-uwoj.onrender.com/reply/get-replyes?commentId=${questionId}&pageNumber=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      // setReplies((prevReplies) => [...prevReplies, ...response.data.data]);
      setReplies(() => response.data.data);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    getReplies(page);
  }, [page, questionId, token, reload]); // Fetch replies whenever the page number changes

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="replies-component">
      <button className="back-btn" onClick={() => setShowReplies(false)}>
        X
      </button>
      <button
        className="add-reply-btn"
        onClick={() => setAddReply((addReply) => !addReply)}
      >
        Add reply
      </button>
      {addReply && (
        <AddQuestion
          questionId={questionId}
          isReply={true}
          setAskQuestion={setAddReply}
          reload={re}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {
            <>
              {replies.map((reply) => (
                <ReplyCard data={reply} key={reply.id} reload={re} />
              ))}

              {/* <button onClick={() => handlePageChange(page + 1)}>
                Load more
              </button> */}
            </>
          }{" "}
        </>
      )}
    </div>
  );
}

export default RepliesComponent;
