import Header from "../components/Home/Header";
import CoursesList from "../components/Courses/CoursesList";
import "./UserPage.css";
import { useEffect } from "react";
import axios from "axios";

function UserPage() {
//   useEffect(() => {

//     async function pageData() {
//       try {
//         const response = await axios.get(
//           "https://e-learning-platform-uwoj.onrender.com/user/get-user/655"
//         );
//         console.log(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     pageData();
//   }, []);  
return (
    <>
      <Header />
      <div className="userpage-main">
        <div className="img-title">
          <img src="https://via.placeholder.com/300x150" alt="" />
          <div className="userpage-title">
            <p>Instructor</p>
            <h1>Jonas schmedtman</h1>
          </div>
        </div>
        <h1>About me</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio et ut
          beatae, aliquid laudantium sunt possimus placeat nulla doloribus
          dolore quibusdam dolorem! At ex quam quod id doloremque fugit amet?
        </p>
        <h1>My courses</h1>
        {/* <CoursesList courses={courses} /> */}
      </div>
    </>
  );
}
export default UserPage;
