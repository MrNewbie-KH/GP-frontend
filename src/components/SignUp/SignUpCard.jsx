// import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import Button from "./Button";
import facebookImage from "../../images/facebook.png";
import googleImage from "../../images/google.png";
import { NavLink } from "react-router-dom";
function SignUpCard() {
  return (
    <div className="card">
      <h1>Create Account</h1>
      <p>Do you have an account ?  
        <NavLink to="/login">
        Login
        </NavLink>
        </p>
      <SignUpForm />
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
export default SignUpCard;
