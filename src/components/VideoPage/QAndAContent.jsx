import QuestionCard from "./QuestionCard";
import SeeMore from "./SeeMore";
import AddQuestion from "./AddQuestion";
import Loader from "../Loader";
import { useState, useEffect } from "react";
import axios from "axios";

function QAndAContent({ id }) {
  const [comments, setComments] = useState([]);
  const [askQuestion, setAskQuestion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [prevpage, setprevpage] = useState(0);
  const [nomore, setNomore] = useState(false);
  const token = localStorage.getItem("token");
  const re = () => {
    setReload((reload) => !reload);
  };
  const changePage = () => {
    let p = page + 1;
    setPage(p);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://e-learning-platform-uwoj.onrender.com/comment/get-comments/${id}/${page}`,
          {
            headers: {
              ...(token !== null && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (response.data.data.length < 5) {
          setNomore(true);
        }
        if (prevpage !== page) {
          setComments([...comments, ...response.data.data]);
          setprevpage(page);
        } else {
          setComments(response.data.data);
        }
        // setComments([...comments, ...response.data.data]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [id, reload, page, comments]);

  return (
    <>
      <h1>Questions</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {askQuestion && (
            <AddQuestion
              isReply={false}
              setAskQuestion={setAskQuestion}
              id={id}
              reload={re}
            />
          )}
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
                <QuestionCard question={comment} key={comment.id} reload={re} />
              ))}
              {!nomore && <SeeMore changePage={changePage}>Questions</SeeMore>}
            </>
          </>
        </>
      )}
    </>
  );
}
export default QAndAContent;
