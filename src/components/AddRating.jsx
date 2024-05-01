import { useState } from "react";
import StarRating from "./StarRating";

function AddRating() {
    const [userRating,setUserRating]=useState(0);
    console.log("user",userRating);
  return (
    <div className="add-rating-review-content">
      <h2>Review & Rating</h2>
      <StarRating setUserRating={setUserRating}/>
      <form className="review-form">
        <label htmlFor="review">Add your review</label>
        <textarea
          id="review"
          name="review"
          placeholder="In my opinion, this is the greatest course ever ..."
          rows="4"
        ></textarea>
        <button type="submit">Save review</button>
      </form>
    </div>
  );
}

export default AddRating;
