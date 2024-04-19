import ReplyCard from "./ReplyCard";
import SeeMore from "./SeeMore";
import AddQuestion from "./AddQuestion";
import { useState } from "react";
function RepliesComponent({ setShowReplies }) {
  const [addReply, setAddReply] = useState(false);
  return (
    <div className="replies-component">
      {addReply ? (
        <AddQuestion isReply={true}setAskQuestion={setAddReply} />
      ) : (
        <>
          <button className="back-btn" onClick={() => setShowReplies(false)}>
            Back to all questions
          </button>
          <ReplyCard />
          <ReplyCard />
          <ReplyCard />
          <button className="add-reply-btn" onClick={() => setAddReply(true)}>
            Add reply
          </button>
          <SeeMore>Replies</SeeMore>
        </>
      )}
    </div>
  );
}
export default RepliesComponent;
