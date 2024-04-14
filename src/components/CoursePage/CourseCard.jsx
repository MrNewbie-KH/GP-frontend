import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Button from "../Button";
import InfoItem from "./InfoItem";

function CourseCard({ information }) {
    console.log("Hi");
    console.log(information);
  return (
    <div className="course-card-viewer">
      <VideoPlayer />
      <p>Price 100$</p>
      <Button>Add to cart</Button>
      <Button>Buy now</Button>
      <p>30 days money back</p>
      {Object.keys(information).map((key, index) => (
        <InfoItem key={index} data={information[key]} />
      ))}
    </div>
  );
}

export default CourseCard;
