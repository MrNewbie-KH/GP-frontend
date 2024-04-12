import LogInCard from "../components/LogIn/LogInCard";
import LogInImage from "../components/LogIn/LogInImage";
function LogIn() {
  return (
    <div className="LogInPageBox">
      {/* left hand side the main component */}
      <LogInCard />
      {/* right hand side the image component */}
      <LogInImage />
    </div>
  );
}
export default LogIn;
