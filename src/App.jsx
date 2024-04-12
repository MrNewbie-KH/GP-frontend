import "./App.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage"
function App() {
  return (
    <>
      <HomePage />
      <VideoPage/>
      <SignUp />
      <LogIn />
    </>
  );
}

export default App;
