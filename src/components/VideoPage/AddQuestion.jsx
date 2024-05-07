import { useState } from "react";

function AddQuestion({ isReply, setAskQuestion }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Title:", title);
    console.log("Description:", description);
    // Add your logic here to handle the form submission
  };

  return (
    <div className="add-question-card">
      <button className="back-btn" onClick={() => setAskQuestion(false)}>
        Back  
      </button>
      <form onSubmit={handleSubmit}>
        {!isReply && (
          <>
          <label htmlFor="title">Title:</label>
        
        <input
          type="text"
          id="question-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="i.e what is the best practice here?"
          />
          </>
        )}
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your description here..."
        />
        <button type="submit" className="submit-question-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddQuestion;
