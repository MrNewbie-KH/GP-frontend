import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import axios from "axios";

function AddRating({ courseId, status }) {
  const token = localStorage.getItem("token");
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const addReview = async function () {
    const response = await axios.post(
      `https://e-learning-platform-uwoj.onrender.com/review/add-review`,
      {
        rating: userRating,
        content: reviewText,
        courseId: courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  async function editReview() {
    const respone = await axios.post(
      `https://e-learning-platform-uwoj.onrender.com/review/update-review`,
      {
        content: reviewText,
        rating: userRating,
        reviewId: courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(respone);
  }
  return (
    <div className="add-rating-review-content">
      <h2>Review & Rating</h2>
      <StarRating stars = {userRating}setUserRating={setUserRating} />
      <form className="review-form">
        <label htmlFor="review">Add your review</label>
        <textarea
          id="review"
          name="review"
          placeholder="In my opinion, this is the greatest course ever ..."
          rows="4"
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            status === "add" ? addReview() : editReview();
          }}
        >
          Save review
        </button>
      </form>
    </div>
  );
}

export default AddRating;
