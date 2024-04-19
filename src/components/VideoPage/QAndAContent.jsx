import QuestionCard from "./QuestionCard";
import SeeMore from "./SeeMore";
import AddQuestion from "./AddQuestion";
import { useState } from "react";

function QAndAContent({ information }) {
  const [askQuestion, setAskQuestion] = useState(false);
  const [openReplies, setOpenReplies] = useState(false);

  return (
    <>
      <h1>Questions</h1>
      {askQuestion ? (
        <AddQuestion isReply={false}setAskQuestion={setAskQuestion} />
      ) : (
        <>
          {!openReplies ? (
            <>
            <button
              className="add-question-btn"
              onClick={() => setAskQuestion(true)}
            >
              <span>+</span> Add question
            </button>
            <QuestionCard
            openReplies={openReplies}
            setOpenReplies={setOpenReplies}
          />
          <SeeMore>Questions</SeeMore>
            </>
          ):<QuestionCard
          openReplies={openReplies}
          setOpenReplies={setOpenReplies}
        /> }

          
        </>
      )}
    </>
  );
}

export default QAndAContent;
