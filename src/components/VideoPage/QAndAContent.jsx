import QuestionCard from "./QuestionCard";
import SeeMore from "./SeeMore";
import AddQuestion from "./AddQuestion";
import Loader from  "../Loader"
import { useState, useEffect } from "react";
import axios from "axios";

function QAndAContent({ id }) {
  const [comments, setComments] = useState([]);
  const [askQuestion, setAskQuestion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getVideo();
  }, []);

  const getVideo = async () => {
    try {
      const response = await axios.get(
        `https://e-learning-platform-uwoj.onrender.com/comment/get-comments/${id}/${0}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <h1>Questions</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {askQuestion ? (
            <AddQuestion isReply={false} setAskQuestion={setAskQuestion} id={id} />
          ) : (
            <>
              {/* {!openReplies ? ( */}
                <>
                  <button
                    className="add-question-btn"
                    onClick={() => setAskQuestion(true)}
                  >
                    <span>+</span> Add question
                  </button>
                  {comments.map((comment) => (
                    <QuestionCard
                      question={comment}
                      key={comment.id}
                    />
                  ))}
                  <SeeMore>Questions</SeeMore>
                </>
            </>
          )}
        </>
      )}
    </>
  );
}
export default QAndAContent