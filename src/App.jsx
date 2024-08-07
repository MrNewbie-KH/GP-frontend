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
import Category from "./pages/Category";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import CourseCreate from "./pages/CourseCreate";
import AccountSettings from "./pages/AccountSettings";
// const routes=createBrowserRouter(cre)
function App() {
  useEffect(() => {
    try {
      var link = document.createElement("link");
      link.rel = "icon";
      link.href = "../src/images/logo.png";
      //  link.href = "https://github.com/MrNewbie-KH/GP-frontend/blob/2b0905ad342ca091542903080108591b43d52494/src/images/logo.png";

      document.head.appendChild(link);
    } catch (error) {
      console.error("Error setting favicon:", error);
    }
  }, []); // Add an empty dependency array to run the effect only once

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:page?/:token?" element={<Home />} />
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
          <Route path="/course/:id" element={<CoursePage />}></Route>{" "}
          <Route path="/dashboard" element={<Dashboard />}></Route>
          {/* ------------------------------------------------------------------------------------------ */}
          <Route
            path="/dashboard/create/:cid?/:sid?/:lid?"
            element={<CourseCreate />}
          ></Route>
          <Route
            path="/dashboard/update/:cid?/:sid?/:lid?"
            element={<CourseCreate />}
          ></Route>
          {/* ------------------------------------------------------------------------------------------ */}
          <Route path="/courses/:title?" element={<Courses />}></Route>
          <Route path="/category/:title/:page?" element={<Category />}></Route>
          <Route path="/video/:cid/:vid" element={<VideoPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/accountsettings" element={<AccountSettings />} />
          <Route path="/reset-password/:token?" element={<AccountSettings />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/not-found" element={<NotfoundPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
