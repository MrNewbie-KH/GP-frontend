function InfoItem({data}){
    return(
        <div className="info-item-course-card">
            <p>{data.name}</p>
            <p>{data.value}</p>
        </div>
    )
}
export default InfoItem