import "./App.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import VideoPage from "./pages/VideoPage";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import NotfoundPage from "./pages/NotfoundPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/coursePage" element={<CoursePage/>}>
      </Route>
      <Route path="/videoPage" element={<VideoPage/>}/>
      <Route path="*" element={<NotfoundPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
