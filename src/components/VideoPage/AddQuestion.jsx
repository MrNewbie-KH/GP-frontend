import axios from "axios";
import { useState } from "react";

function AddQuestion({ questionId, isReply, setAskQuestion, id }) {
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");
  const handleSubmit = async (event) => {
    event.preventDefault();
    isReply ? addNewReply() : addNewQuestion();
  };
  async function addNewQuestion() {
    try {
      const response = await axios.post(
        "https://e-learning-platform-uwoj.onrender.com/comment/create-comment",
        {
          lessonId: id,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error here:", error);
    }
  }
  async function addNewReply() {
    try {
      const response = await axios.post(
        "https://e-learning-platform-uwoj.onrender.com/reply/create-reply",
        {
          commentId: questionId,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error here:", error);
    }
  }
  async function addNewNote() {
    try {
      const response = await axios.post(
        "https://e-learning-platform-uwoj.onrender.com/lesson/note/create-Note",
        {
          commentId: questionId,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error here:", error);
    }
  }
  // -------------------------------------------------------------
  return (
    <div className="add-question-card">
      <button className="back-btn" onClick={() => setAskQuestion(false)}>
        Back
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Add">Add:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter here..."
        />
        <button type="submit" className="submit-question-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddQuestion;
