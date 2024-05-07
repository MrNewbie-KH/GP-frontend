// import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Button from "../Button";
import InfoItem from "./InfoItem";

function CourseCard({ information }) {
  return (
    <div className="course-card-viewer">
      <img src={information.imageUrl} alt="" />
      <p>Price {information.price}$</p>
      <Button className="btn">Add to cart</Button>
      <Button className="btn">Buy now</Button>
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
    </div>
  );
}

export default CourseCard;
