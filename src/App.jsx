import "./App.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import VideoPage from "./pages/VideoPage";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import NotfoundPage from "./pages/NotfoundPage";
import Courses from "./pages/Courses";
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";

// const routes=createBrowserRouter(cre)
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/course/:id" element={<CoursePage />}></Route>
          <Route path="/courses/:title?" element={<Courses />}></Route>
          <Route path="/videoPage" element={<VideoPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
