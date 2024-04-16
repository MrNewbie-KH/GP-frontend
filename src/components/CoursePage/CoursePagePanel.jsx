function CoursePagePanel({setSelectedPanel}) {
  return (
    <>
      <button
        className="btn panel-btn"
        onClick={() => setSelectedPanel("overview")}
      >
        OverView
      </button>
      <button
        className="btn panel-btn"
        onClick={() => setSelectedPanel("courseContent")}
      >
        Course content
      </button>
      <button
        className="btn panel-btn"
        onClick={() => setSelectedPanel("instructors")}
      >
        Instructors
      </button>
      <button
        className="btn panel-btn"
        onClick={() => setSelectedPanel("reviews")}
      >
        Reviews
      </button>
    </>
  );
}
export default CoursePagePanel;
