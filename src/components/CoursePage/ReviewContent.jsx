import StarRating from "../StarRating";
function ReviewsContent() {
  return (
    <div className="reviews-content">
      <h3> Reviews Content</h3>
      <div className="reviews-content-big-box">

      <div className="course-rating-box">
        <h1 className="course-rating-number">4.5</h1>
        <StarRating stars={4.5}/>
        <p>Course Rating</p>
      </div>
      <div className="different-ratings-box">
        <div className="rating-text">
        <StarRating size ={18} stars={5}/> 
        <p>Excellent</p>
        </div>
      
        <div className="rating-text">
        <StarRating size ={18} stars={4}/> 
        <p>Verygood</p>

        </div>
      
        <div className="rating-text">
        <StarRating size ={18} stars={3} /> 
        <p>Good</p>
        </div>
      
        <div className="rating-text">
        <StarRating size ={18} stars={2}/> 
        <p>Accepted</p>
        </div>
      
        <div className="rating-text">
        <StarRating size ={18} stars={1}/> 
        <p>Bad</p>
        </div>
      
      </div>
      </div>

    </div>
  );
}
export default ReviewsContent;