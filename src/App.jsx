import "./App.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import VideoPage from "./pages/VideoPage";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import NotfoundPage from "./pages/NotfoundPage";
import Courses from "./pages/Courses";
import UnProtectedRoute from "./components/UnProtectedRoute";
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Cart from "./pages/Cart";
import MyLearning from "./pages/MyLearning";
import Profile from "./pages/Profile";
import UserPage from "./pages/UserPage";
import EditProfile from "./pages/EditProfile";

// const routes=createBrowserRouter(cre)
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <UnProtectedRoute>
                <LogIn />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <UnProtectedRoute>
                <SignUp />
              </UnProtectedRoute>
            }
          />
          <Route path="/mylearning" element={<MyLearning />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/course/:id" element={<CoursePage />}></Route>
          <Route path="/courses/:title?" element={<Courses />}></Route>
          <Route path="/videoPage" element={<VideoPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
