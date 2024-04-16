import InstructorCard from "./InstructorCard"
function InstructorsContent({information}) {
    return( <div className="instructors-content">
        <h3>Instructor</h3>
    <ul>
    {information&&information.map((instructor,index)=>{
        return <InstructorCard key={index} instructor={instructor}/>
    })}

    </ul>
    </div>)
  }
  export default InstructorsContent