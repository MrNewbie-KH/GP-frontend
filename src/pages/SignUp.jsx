import Header from "../components/Home/Header";
import SignUpCard from "../components/SignUp/SignUpCard";
import SignUpImage from "../components/SignUp/SignUpImage";
import "./SignUp.css";
function SignUp() {
  return (
    <>
      <Header />

      <div className="signupPageBox">
        {/* left hand side the main component */}
        <SignUpCard />
        {/* right hand side the image component */}
        <SignUpImage />
      </div>
    </>
  );
}
export default SignUp;
