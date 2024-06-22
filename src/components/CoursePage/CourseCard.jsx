// import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Button from "../Button";
import InfoItem from "./InfoItem";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function CourseCard({ information }) {
  const token = localStorage.getItem("token");

  const AddToCart = () => {
    console.log("dfasgha");
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
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
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
      <p>Price {information.price}$</p>
      <button className="button" onClick={AddToCart}>
        Add to cart
      </button>
      {/* <Button className="btn">Buy now</Button> */}
      <p>30 days money back</p>
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
          <span>{information.averageRating}</span>
        </li>
      </ul>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default CourseCard;
