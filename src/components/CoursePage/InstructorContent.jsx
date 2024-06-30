import { NavLink } from "react-router-dom";
import InstructorCard from "./InstructorCard";
function InstructorsContent({ information }) {
  return (
    <div className="instructors-content">
      <h3>Instructor</h3>
      <ul>
        {information.instructors &&
          information.instructors.map((instructor, index) => {
            return (
              <NavLink key={index} to={`/user/${instructor.id}`}>
                <InstructorCard key={index} instructor={instructor} />
              </NavLink>
            );
          })}
      </ul>
    </div>
  );
}
export default InstructorsContent;
