import axios from "axios";
import { useState } from "react";

function AddQuestion({ isReply, setAskQuestion, id }) {
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post(
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
        )
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.error("Error here:", error);
    }
  };

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
