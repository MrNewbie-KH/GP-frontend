function InfoItem({ data }) {

    return (
      <ul className="info-List-course-card">
        {data && Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <span>{key}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    );
  }
export default InfoItem