// import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Button from "../Button";
import InfoItem from "./InfoItem";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function CourseCard({ information }) {
  const token = localStorage.getItem("token");
  const AddToCart = () => {
    axios
      .post(
        `https://e-learning-platform-uwoj.onrender.com/user/add-to-cart?courseId=${information.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        if (response.data.message === "Course added to cart") {
          toast.success("Course added to cart");
        } else {
          toast.error("already in cart");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching courses:", error);
        toast.error("Failed to add item to cart!");
      });
  };

  return (
    <div className="course-card-viewer">
      <img src={information.imageUrl} alt="" />
      {!information.isSubscribed ? (
        <>
          <p>Price {information.price} EGP</p>
          <button className="button" onClick={AddToCart}>
            Add to cart
          </button>
          <p>30 days money back</p>
        </>
      ) : (
        <></>
      )}
      <ul className="info-List-course-card">
        <li>
          <span>language</span>
          <span>{information.language}</span>
        </li>
        <li>
          <span>level</span>
          <span>{information.level}</span>
        </li>
        <li>
          <span>Students</span>
          <span>{information.numberOfEnrollments}</span>
        </li>
        <li>
          <span>Rating</span>
          <span>
            {information.averageRating} ({information.numberOfRatings} ratings)
          </span>
        </li>
      </ul>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default CourseCard;
