import axios from "axios";
import StarRating from "../StarRating";
import AddRating from "../AddRating";
import { useState } from "react";

function ReviewCard({ data, isReviewd, number, reload }) {
  const [editIt, setEditIt] = useState(false);
  const token = localStorage.getItem("token");

  let CloseEdit = () => {
    setEditIt(false);
  };

  async function deleteReview() {
    try {
      const response = await axios.get(
        `https://e-learning-platform-uwoj.onrender.com/review/delete-review?reviewId=${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      reload();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }

  return (
    <>
      <div className="review-card">
        <div className="top-part-review-card">
          <div className="image-name-rating">
            <img src={data.user.imageUrl} alt="" />
            <div className="name-stars">
              <p>
                {data.user.firstName} {data.user.lastName}
              </p>
              <div className="rating-container">
                <StarRating stars={data.rating} size={16} />
                <p className="reviewContent">{data.rating} </p>
              </div>
            </div>
          </div>
          {isReviewd && number === 0 && (
            <div className="edit-delete-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={() => setEditIt(true)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="w-6 h-6"
                onClick={deleteReview}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          )}
        </div>
        <p className="myReviewContent">{data.content}</p>
      </div>
      {editIt && (
        <AddRating
          courseId={data.id}
          status={"edit"}
          reload={reload}
          hide={CloseEdit}
        />
      )}
    </>
  );
}
export default ReviewCard;
