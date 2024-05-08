import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import VideoPage from "./pages/VideoPage";
import Home from "./pages/Home";
import NotfoundPage from "./pages/NotfoundPage";
import Cart from "./pages/Cart";
import CoursePage from "./pages/CoursePage";
import Courses from "./pages/Courses";
import ProtectedRoute from "./components/ProtectedRoute";
import UnProtectedRoute from "./components/UnProtectedRoute";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import MyLearning from "./components/MyCourses/MyLearning";
import Archived from "./components/MyCourses/Archived";
import Wishlist from "./components/MyCourses/WishList";
import EditProfile from "./pages/EditProfile";
import UserPage from "./pages/UserPage";
import ProfilePage from "./pages/ProfilePage";
import Payment from "./pages/Payment";
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

          <Route
            path="/mycourses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          >
            <Route index element={<MyLearning />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="archived" element={<Archived />} />
          </Route>

          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/course/:id" element={<CoursePage />}></Route>
          <Route path="/courses/:title?" element={<Courses />}></Route>
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
