// import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Button from "../Button";
import InfoItem from "./InfoItem";

function CourseCard({ information }) {
  return (
    <div className="course-card-viewer">
      <img src="https://via.placeholder.com/300x150" alt="" />
      <p>Price 100$</p>
      <Button className="btn">Add to cart</Button>
      <Button className="btn">Buy now</Button>
      <p>30 days money back</p>
      <InfoItem data={information} className="info-List-course-card"/>
    </div>
  );
}

export default CourseCard;
