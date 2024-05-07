function MainCourseInfo({information}) {
  return (
    <div className="main-course-info">
      <h1 className="course-info-title">{information.title}</h1>

      <p className="course-info-description">
        {information.description}
      </p>
    </div>
  );
}
export default MainCourseInfo;
