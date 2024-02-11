import SignUpCard from "../components/SignUp/SignUpCard";
import SignUpImage from "../components/SignUp/SignUpImage";
import style from "./SignUp.module.css";
function SignUp() {
  return (
    <div className={style.signupPageBox}>
      {/* left hand side the main component */}
      <SignUpCard />
      {/* right hand side the image component */}
      <SignUpImage />
    </div>
  );
}
export default SignUp;
// 1- provide field email, f-name, l-name ,password, phone! , birthday! , photo!
