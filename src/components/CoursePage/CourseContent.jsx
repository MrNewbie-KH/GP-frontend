import SectionCard from "./SectionCard";

function CourseContent({ information }) {
  return (
    <div className="course-content-section">
      {information &&
        information.map((info, index) => (
          <SectionCard key={index} data={info} />
        ))}
    </div>
  );
}

export default CourseContent;