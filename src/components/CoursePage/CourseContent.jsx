import SectionCard from "./SectionCard";

function CourseContent({ information ,id}) {
  const getData= async function(){
    
  } 
  if(!information){
    getData();
  }
  return (
    <div className="course-content-section">
      {information.sections &&
        information.sections.map((info, index) => (
          <SectionCard key={index} data={info} isSubscribed = {information.isSubscribed} />
        ))}
    </div>
  );
}

export default CourseContent;
