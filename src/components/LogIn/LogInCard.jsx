// import { Link } from "react-router-dom";
import LogInForm from "./LogInForm";
import Button from "./Button";
import facebookImage from "../../images/facebook.png";
import googleImage from "../../images/google.png";
function LogInCard() {
  return (
    <div className="card">
      <h1>Log In</h1>
      <p>
        Don't have an account? <a href="">Sign Up</a>
      </p>
      <LogInForm />
      <h1 className="separator">OR</h1>
      <Button variant="facebook">
        <img
          src={facebookImage}
          alt="facebook image"
          style={{ width: "20px", height: "20px" }}
        />
        Facebook
      </Button>

      <Button variant="google">
        <img
          src={googleImage}
          alt="facebook image"
          style={{ width: "20px", height: "20px", borderRadius: "100px" }}
        />
        Google
      </Button>
    </div>
  );
}
export default LogInCard;
