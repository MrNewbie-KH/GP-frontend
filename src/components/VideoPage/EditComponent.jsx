import axios from "axios";
import { useState } from "react";

function EditComponent({ setEdit,id, type, content }) {
  const [state, setState] = useState(content);
  const token = localStorage.getItem("token");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (type === "reply") editReply();
    else if (type === "question") editQuestion();
    else if (type === "note") editNote();
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
