// import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import style from "./SignUpCard.module.css";
import Button from "./Button";
import facebookImage from "../../images/facebook.png";
import googleImage from "../../images/google.png";
function SignUpCard() {
  return (
    <div className={style.card}>
      <h1>Create Account</h1>
      <p>Do you have an account ? signin</p>
      <SignUpForm />
      <h1 className={style.separator}>OR</h1>
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
