const InstructorCard = ({ instructor }) => {
  return (
    <div className="instructor-card">
      <div className="image-and-name">
        <img
          src={instructor.imageUrl}
          alt={instructor.firstName}
          className="instructor-image"
        />
        <div className="info">
          <p className="instructor-name">
            {instructor.firstName} {instructor.lastName}
          </p>
          {/* <div className="info-instructor">
            <div className="info-part">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
              <p>{instructor.courses} Courses</p>
            </div>
            <div className="info-part">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <p>{instructor.students} Students</p>
            </div>
          </div> */}
        </div>
      </div>
      <p className="description">{instructor.about}</p>
    </div>
  );
};

export default InstructorCard;
