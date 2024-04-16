import LearnOutcome from "./LearnOutcome";
function 
OverviewContent({information}) {
  return (
    <div className="overview-content">
      <div className="overview-content-description">
        <h2>Description</h2>
        <p>
          {information&&information[0].description}
        </p>
      </div>
      <div className="overview-content-learn">
        <h2>What you will learn</h2>
        <ul>
            {information&&information[0].learn.map((info,index)=>{
               return <LearnOutcome key={index} data={info}/>
            })}
        </ul>
      </div>
      <div className="overview-content-requirements">
        <h2>Prerequiset</h2>
        <p>Before starting make sure you know</p>
        <ul>
            {information&&information[0].prerequisites.map((info,index)=>{
               return <LearnOutcome  key={index} data={info}/>
            })}
        </ul>      </div>
    </div>
  );
}
export default OverviewContent;
