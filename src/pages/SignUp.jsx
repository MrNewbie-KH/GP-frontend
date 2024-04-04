import SignUpCard from "../components/SignUp/SignUpCard";
import SignUpImage from "../components/SignUp/SignUpImage";
function SignUp() {
  return (
    <div className="signupPageBox">
      {/* left hand side the main component */}
      <SignUpCard />
      {/* right hand side the image component */}
      <SignUpImage />
    </div>
  );
}
export default SignUp;
