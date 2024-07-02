import axios from "axios";
import { useState } from "react";

function EditComponent({ setEdit, id, type, content, reload }) {
  const [state, setState] = useState(content);
  const token = localStorage.getItem("token");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (type === "reply") editReply();
    else if (type === "question") editQuestion();
    else if (type === "note") editNote();
    setEdit(false);
  };
  async function editReply() {
    try {
      const response = await axios.post(
        "https://e-learning-platform-uwoj.onrender.com/reply/update-reply",
        {
          replyId: id,
          content: state,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      reload();
    } catch (error) {
      console.error("Error here:", error);
    }
  }
  async function editQuestion() {
    try {
      const response = await axios.post(
        "https://e-learning-platform-uwoj.onrender.com/comment/update-comment",
        {
          commentId: id,
          content: state,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      reload();
    } catch (error) {
      console.error("Error here:", error);
    }
  }
  const editNote = async () => {
    try {
      const response = await axios.post(
        `https://e-learning-platform-uwoj.onrender.com/lesson/note/update-Note`,
        {
          content: state,
          noteId: id,
        },
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
  // -------------------------------------------------------------
  return (
    <div className="add-question-card">
      <button className="back-btn" onClick={() => setEdit(false)}>
        Back
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Add">Add:</label>
        <textarea
          id="description"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter here..."
        />
        <button type="submit" className="submit-question-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditComponent;
