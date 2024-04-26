import Header from "../components/Home/Header";
import LogInCard from "../components/LogIn/LogInCard";
import LogInImage from "../components/LogIn/LogInImage";
import "./LogIn.css";

function LogIn() {
  return (
    <>
      <Header />
      <div className="loginPageBox">
        {/* left hand side the main component */}
        <LogInCard />
        {/* right hand side the image component */}
        <LogInImage />
      </div>
    </>
  );
}
export default LogIn;
