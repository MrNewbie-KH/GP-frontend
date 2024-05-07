import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import ReviewCard from "./ReviewCard";
import AddRating from "../AddRating";
import axios from "axios";
import Loader from "../Loader";

function ReviewsContent({ rating, courseId,isSubscribed }) {
  const token = localStorage.getItem("token");
  const [information, setInformation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async function () {
      try {
        const response = await axios.get(`https://e-learning-platform-uwoj.onrender.com/review/get-reviews?courseId=${courseId}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        setInformation(response.data)
        setIsLoading(false)
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="reviews-content">
      {isLoading ? <Loader/> : 
      <>
      <h3> Reviews Content</h3>


      <div className="reviews-content-big-box">
        <div className="course-rating-box">
          <h1 className="course-rating-number">{rating}</h1>
          <StarRating stars={rating} />
          <p>Course Rating</p>
        </div>
        <div className="different-ratings-box">
          <div className="rating-text">
            <StarRating size={18} stars={5} />
            <p>Excellent</p>
          </div>

          <div className="rating-text">
            <StarRating size={18} stars={4} />
            <p>Verygood</p>
          </div>

          <div className="rating-text">
            <StarRating size={18} stars={3} />
            <p>Good</p>
          </div>

          <div className="rating-text">
            <StarRating size={18} stars={2} />
            <p>Accepted</p>
          </div>

          <div className="rating-text">
            <StarRating size={18} stars={1} />
            <p>Bad</p>
          </div>
        </div>
      </div>
      {(!information.isReviewd&&isSubscribed)&& <AddRating courseId={courseId} status={"add"}/>}
      
      { information.data &&
        information.data.map((review, index) => {
          return <ReviewCard key={index} data={review} isReviewd={information.isReviewd} number={index} />;
        })}

  </>
}
    </div>
  );
}

export default ReviewsContent;